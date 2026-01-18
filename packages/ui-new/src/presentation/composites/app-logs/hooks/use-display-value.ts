"use client";

import { useCallback } from "react";

import type { LogsLabels } from "../types";

const defaultLabels: Pick<LogsLabels, "true" | "false" | "empty"> = {
  true: "Yes",
  false: "No",
  empty: "Empty",
};

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

/**
 * Check if value is empty (null, undefined, empty string, or whitespace only)
 */
const isEmpty = (v: unknown): boolean =>
  v === null || v === undefined || v === "" || (typeof v === "string" && v.trim() === "");

/**
 * Stringify a value safely without producing [object Object]
 */
const stringify = (v: unknown): string => {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "bigint") return v.toString();
  if (typeof v === "symbol") return v.toString();
  return JSON.stringify(v);
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
        const opts = conversor[field];
        const mapOne = (x: unknown) =>
          opts.find((o) => String(o.value) === String(x))?.label ?? null;

        v = Array.isArray(v) ? v.map(mapOne).join(", ") : mapOne(v);
      }

      // Boolean
      if (typeof v === "boolean") {
        return v ? labels.true : labels.false;
      }

      // null / undefined / empty string / whitespace only
      if (isEmpty(v)) {
        return `[${labels.empty}]`;
      }

      // Date string
      if (typeof v === "string" && DATE_REGEX.test(v)) {
        return new Date(v).toLocaleString(dateLocale);
      }

      return stringify(v);
    },
    [conversor, labels, dateLocale]
  );
};
