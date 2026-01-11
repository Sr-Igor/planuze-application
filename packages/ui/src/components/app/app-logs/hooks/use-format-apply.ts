import { useCallback } from "react";

export const useFormatApply = <T>(
  format?: Partial<Record<keyof T, (value: any, item: T) => any>>
) => {
  return useCallback(
    (field: keyof T, value: any, item: T) => {
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
