// Update with your config settings.
require('dotenv').config({ path: '.env.local' });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      directory: "./src/server/db/migrations",
      extension: "js",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./src/server/db/seeds",
      extension: "ts",
      loadExtensions: [".ts"],
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      directory: "./src/app/server/db/migrations",
      extension: "js",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./src/app/server/db/migrations",
      extension: "ts",
      loadExtensions: [".ts"],
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      directory: "./src/app/server/db/migrations",
      extension: "js",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./src/app/server/db/migrations",
      extension: "ts",
      loadExtensions: [".ts"],
    },
  },
};

module.exports = knexConfig;
