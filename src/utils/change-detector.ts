export interface FieldChanges<T> {
  hasChanges: boolean;
  changes: Partial<T>;
}

/**
 * Compares current object with incoming updates and returns which fields changed.
 */
export function getFieldChanges<T extends object>(
  current: T,
  incoming: Partial<T>
): FieldChanges<T> {
  const changes: Partial<T> = {};
  let hasChanges = false;

  for (const key of Object.keys(incoming) as (keyof T)[]) {
    const newVal = incoming[key];
    if (newVal === undefined) continue;

    const oldVal = current[key];
    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      (changes as Record<string, unknown>)[key as string] = newVal;
      hasChanges = true;
    }
  }

  return { hasChanges, changes };
}
