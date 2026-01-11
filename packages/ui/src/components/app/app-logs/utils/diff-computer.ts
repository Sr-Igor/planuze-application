import { DiffItem } from '../types';

const normalizeValue = (value: any) => {
    if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '')) {
        return null;
    }
    return value;
};

export const computeDiffs = <T>(
    oldItem: Record<string, any>,
    newItem: Record<string, any>,
    oldItemComplete: Record<string, any>,
    newItemComplete: Record<string, any>,
    applyFormat: (field: keyof T, value: any, item: T) => any
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
                newValue: fNew
            };
        })
        .filter(Boolean) as DiffItem[];
};
