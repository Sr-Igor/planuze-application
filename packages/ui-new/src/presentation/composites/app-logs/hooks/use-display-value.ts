"use client";

import { useCallback } from "react";

import type { LogsLabels } from "../types";

const defaultLabels: Pick<LogsLabels, "true" | "false" | "empty"> = {
  true: "Yes",
  false: "No",
  empty: "Empty",
};

/**
 * Hook to format display values with conversor support
 */
export const useDisplayValue = <T>(
  conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>,
  labels: Pick<LogsLabels, "true" | "false" | "empty"> = defaultLabels,
  dateLocale: string = "pt-BR"
) => {
  return useCallback(
    (field: keyof T | undefined, value: unknown): string => {
      let v = value;

      // Conversor value → label
      if (field && conversor?.[field]) {
        const opts = conversor[field]!;
        const mapOne = (x: unknown) =>
          opts.find((o) => String(o.value) === String(x))?.label ?? null;

        v = Array.isArray(v) ? v.map(mapOne).join(", ") : mapOne(v);
      }

      // Boolean
      if (typeof v === "boolean") {
        return v ? labels.true : labels.false;
      }

      // null / undefined / empty string / whitespace only
      if (v === null || v === undefined || v === "" || (typeof v === "string" && v.trim() === "")) {
        return `[${labels.empty}]`;
      }

      // Date
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      if (typeof v === "string" && dateRegex.test(v)) {
        return new Date(v).toLocaleString(dateLocale);
      }

      // Object
      if (typeof v === "object") {
        return JSON.stringify(v);
      }

      // Fallback
      return String(v);
    },
    [conversor, labels, dateLocale]
  );
};
