import type { DiffItem } from "../types";

const normalizeValue = (value: unknown) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }
  return value;
};

/**
 * Compute differences between old and new items
 */
export const computeDiffs = <T>(
  oldItem: Record<string, unknown>,
  newItem: Record<string, unknown>,
  oldItemComplete: Record<string, unknown>,
  newItemComplete: Record<string, unknown>,
  applyFormat: (field: keyof T, value: unknown, item: T) => unknown
): DiffItem[] => {
  const keys = Array.from(new Set([...Object.keys(oldItem), ...Object.keys(newItem)]));

  return keys
    .map((key) => {
      const k = key as keyof T;

      const fOld = applyFormat(k, oldItem[key], oldItemComplete as T);
      const fNew = applyFormat(k, newItem[key], newItemComplete as T);

      const normalizedOld = normalizeValue(fOld);
      const normalizedNew = normalizeValue(fNew);

      if (normalizedOld === normalizedNew) return null;

      return {
        field: key,
        oldValue: fOld,
        newValue: fNew,
      };
    })
    .filter(Boolean) as DiffItem[];
};
