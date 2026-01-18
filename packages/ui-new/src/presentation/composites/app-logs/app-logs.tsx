"use client";

import React from "react";

import { EmptyState, LogContent, LogHeader } from "./components";
import { useDisplayValue, useFormatApply } from "./hooks";
import type { LogsComparisonProps, LogsLabels } from "./types";
import { computeDiffs, copyToClipboard, formatDisplayValue } from "./utils";

const defaultLabels: LogsLabels = {
  true: "Yes",
  false: "No",
  empty: "Empty",
  emptyData: "No data available",
  nothingAction: "No changes",
  field: "Field",
  old: "Old",
  new: "New",
  date: "Date",
  responsible: "Responsible",
  integration: "Integration",
  copied: "Copied",
  logs: "Logs",
  property: (key: string) => key,
  logAction: (action: string) => action,
};

export const AppLogs = <T = Record<string, unknown>,>({
  logs = [],
  deleteKeys = [],
  conversor,
  format,
  labels = defaultLabels,
  dateLocale = "pt-BR",
}: LogsComparisonProps<T>) => {
  const mergedLabels = { ...defaultLabels, ...labels };

  const mergedDeleteKeys = React.useMemo(
    () => Array.from(new Set(["createdAt", "updatedAt", "deletedAt", "id", ...deleteKeys])),
    [deleteKeys]
  );

  const displayValue = useDisplayValue(conversor, mergedLabels, dateLocale);
  const applyFormat = useFormatApply(format);

  const handleCopyToClipboard = React.useCallback(
    (text: string) => copyToClipboard(text, mergedLabels.copied),
    [mergedLabels.copied]
  );

  const formatValue = React.useCallback(
    (field: keyof T | undefined, value: unknown, maxLength: number = 50) =>
      formatDisplayValue(field, value, displayValue, maxLength),
    [displayValue]
  );

  const calculateDiffs = React.useCallback(
    (
      oldItem: Record<string, unknown>,
      newItem: Record<string, unknown>,
      oldItemComplete: Record<string, unknown>,
      newItemComplete: Record<string, unknown>
    ) => computeDiffs(oldItem, newItem, oldItemComplete, newItemComplete, applyFormat),
    [applyFormat]
  );

  return (
    <div className="w-full space-y-4 p-2 sm:space-y-6 sm:p-3">
      {logs.length === 0 ? (
        <EmptyState message={mergedLabels.emptyData} />
      ) : (
        logs
          .slice()
          .reverse()
          .map((log, idx) => {
            // Parse JSON
            let oldItem: Record<string, unknown> = {};
            let newItem: Record<string, unknown> = {};

            try {
              oldItem = log.old ? JSON.parse(log.old) : {};
            } catch {
              /* noop */
            }
            try {
              newItem = log.new ? JSON.parse(log.new) : {};
            } catch {
              /* noop */
            }

            // Remove ignored keys
            mergedDeleteKeys.forEach((k) => {
              delete oldItem[k];
              delete newItem[k];
            });

            // Calculate diffs
            const diffs = calculateDiffs(
              oldItem,
              newItem,
              JSON.parse(log.old || "{}"),
              JSON.parse(log.new || "{}")
            );

            return (
              <div key={log.id || idx} className="bg-accent w-full overflow-hidden rounded-lg">
                <LogHeader log={log} labels={mergedLabels} dateLocale={dateLocale} />
                <LogContent
                  diffs={diffs}
                  formatDisplayValue={formatValue}
                  copyToClipboard={handleCopyToClipboard}
                  labels={mergedLabels}
                />
              </div>
            );
          })
      )}
    </div>
  );
};

AppLogs.displayName = "AppLogs";

export type { LogEntry, LogsComparisonProps } from "./types";
