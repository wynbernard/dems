import { Knex } from 'knex';

// ─── Custom Database Errors ───────────────────────────────────────────────────

export class DatabaseError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resource = 'Record') {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class UniqueConstraintError extends DatabaseError {
  constructor(public readonly column?: string) {
    super(
      column
        ? `A record with this ${column} already exists`
        : 'A record with these values already exists'
    );
    this.name = 'UniqueConstraintError';
  }
}

export class ForeignKeyError extends DatabaseError {
  constructor() {
    super('Related record does not exist or cannot be deleted');
    this.name = 'ForeignKeyError';
  }
}

export class CheckConstraintError extends DatabaseError {
  constructor(message = 'Value violates a database constraint') {
    super(message);
    this.name = 'CheckConstraintError';
  }
}

// ─── Knex Error Detection ─────────────────────────────────────────────────────

function parseKnexError(error: unknown): DatabaseError {
  // Must be an object with a code / message to parse
  if (typeof error !== 'object' || error === null) {
    return new DatabaseError('An unexpected database error occurred', undefined, error);
  }

  const err = error as Record<string, unknown>;
  const code = (err.code as string) ?? '';
  const message = (err.message as string) ?? '';

  // ── PostgreSQL ──────────────────────────────────────────────────────────────
  // 23505 → unique_violation
  if (code === '23505') {
    // Extract column name from detail, e.g. "Key (email)=(...) already exists"
    const detail  = (err.detail as string) ?? '';
    const match   = detail.match(/Key \((.+?)\)/);
    const column  = match?.[1];
    return new UniqueConstraintError(column);
  }

  // 23503 → foreign_key_violation
  if (code === '23503') {
    return new ForeignKeyError();
  }

  // 23514 → check_violation
  if (code === '23514') {
    return new CheckConstraintError();
  }

  // ── MySQL / SQLite ──────────────────────────────────────────────────────────
  if (code === 'ER_DUP_ENTRY' || message.includes('UNIQUE constraint failed')) {
    // SQLite detail: "UNIQUE constraint failed: users.email"
    const match  = message.match(/UNIQUE constraint failed: \w+\.(\w+)/);
    const column = match?.[1];
    return new UniqueConstraintError(column);
  }

  if (
    code === 'ER_NO_REFERENCED_ROW_2' ||
    code === 'ER_ROW_IS_REFERENCED_2' ||
    message.includes('FOREIGN KEY constraint failed')
  ) {
    return new ForeignKeyError();
  }

  // ── Generic fallback ────────────────────────────────────────────────────────
  return new DatabaseError(
    message || 'An unexpected database error occurred',
    code || undefined,
    error
  );
}

// ─── safeQuery ────────────────────────────────────────────────────────────────

/**
 * Wraps any database query in a try/catch.
 * Converts raw Knex / driver errors into typed, readable errors.
 *
 * Usage:
 *   return await safeQuery(async () => {
 *     return await this.db('users').where({ id }).first();
 *   });
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    // Already one of our typed errors — re-throw as-is
    if (error instanceof DatabaseError) {
      throw error;
    }

    // Raw Knex / driver error — parse and rethrow
    throw parseKnexError(error);
  }
}

// ─── Helper: assert record exists ─────────────────────────────────────────────

/**
 * Throws a NotFoundError if the value is null/undefined.
 *
 * Usage:
 *   const user = assertFound(await userRepository.findById(id), 'User');
 */
export function assertFound<T>(
  value: T | null | undefined,
  resource = 'Record'
): T {
  if (value === null || value === undefined) {
    throw new NotFoundError(resource);
  }
  return value;
}