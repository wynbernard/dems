import knex, { Knex } from 'knex';
// @ts-ignore
import knexConfig from '../../../knexfile';

const environment = process.env.NODE_ENV || 'development';

// Singleton pattern to prevent multiple connections
declare global {
  var __db: Knex | undefined;
}

// Create or reuse existing connection
function createConnection(): Knex {
  const config = knexConfig[environment as keyof typeof knexConfig];

  if (process.env.NODE_ENV === 'development') {
    // In development, reuse connection to prevent hot reload issues
    if (!global.__db) {
      global.__db = knex(config);
    }
    return global.__db;
  }

  // In production, create new connection
  return knex(config);
}

export const db = createConnection();

// Add connection pool monitoring
if (process.env.NODE_ENV === 'development') {
  db.on('query', (_query) => {
    // console.log('Query:', query.sql.substring(0, 100) + '...');
  });

  db.on('query-error', (error) => {
    console.error('Query Error:', error);
  });
}

// Test database connection
export async function testConnection() {
  try {
    await db.raw('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Get connection pool status
export function getPoolStatus() {
  const pool = (db as any).client?.pool;
  if (pool) {
    return {
      min:            pool.min,
      max:            pool.max,
      used:           pool.numUsed(),
      free:           pool.numFree(),
      pending:        pool.numPendingAcquires(),
      pendingCreates: pool.numPendingCreates(),
    };
  }
  return null;
}

// Monitor connection pool
export function logPoolStatus() {
  const status = getPoolStatus();
  if (status) {
    console.log('Connection Pool Status:', status);

    // Warn if pool is getting full
    if (status.used / status.max > 0.8) {
      console.warn('⚠️  Connection pool is getting full!', status);
    }
  }
}

// Graceful shutdown
export async function closeConnection() {
  try {
    await db.destroy();
    if (process.env.NODE_ENV === 'development') {
      global.__db = undefined;
    }
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

// Cleanup on process termination
if (process.env.NODE_ENV !== 'test') {
  process.on('SIGINT', async () => {
    console.log('Received SIGINT, closing database connection...');
    await closeConnection();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, closing database connection...');
    await closeConnection();
    process.exit(0);
  });
}