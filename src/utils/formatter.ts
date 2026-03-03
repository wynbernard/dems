/**
 * Converts camelCase keys to snake_case for database compatibility.
 */
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Recursively transforms an object's keys from camelCase to snake_case.
 * Used when mapping domain objects to database rows.
 */
export function transformData<T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' && item !== null
        ? transformData(item as Record<string, unknown>)
        : item
    ) as unknown as Record<string, unknown>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = toSnakeCase(key);
    result[snakeKey] =
      value !== null && typeof value === 'object' && !Array.isArray(value)
        ? transformData(value as Record<string, unknown>)
        : value;
  }
  return result;
}
