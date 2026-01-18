"use client";

import { useCallback } from "react";

/**
 * Hook to apply custom formatters to values
 */
export const useFormatApply = <T>(
  format?: Partial<Record<keyof T, (value: unknown, item: T) => unknown>>
) => {
  return useCallback(
    (field: keyof T, value: unknown, item: T) => {
      if (format?.[field]) {
        try {
          return format[field]!(value, item);
        } catch {
          return value;
        }
      }

      return value;
    },
    [format]
  );
};
