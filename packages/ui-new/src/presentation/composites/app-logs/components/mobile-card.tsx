import { AppTooltip } from "../../app-tooltip";
import type { DiffItem, FormattedValue, LogsLabels } from "../types";

interface MobileCardProps<T> {
  diffs: DiffItem[];
  formatDisplayValue: (field: keyof T | undefined, value: unknown, maxLength: number) => FormattedValue;
  copyToClipboard: (text: string) => void;
  labels: LogsLabels;
}

export const MobileCard = <T,>({
  diffs,
  formatDisplayValue,
  copyToClipboard,
  labels,
}: MobileCardProps<T>) => {
  if (diffs.length === 0) {
    return (
      <p className="p-2 text-[10px] text-gray-500 dark:text-gray-400">
        {labels.nothingAction}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {diffs.map(({ field, oldValue, newValue }, i) => {
        const oldFormatted = formatDisplayValue(field as keyof T, oldValue, 60);
        const newFormatted = formatDisplayValue(field as keyof T, newValue, 60);

        return (
          <div
            key={field + i}
            className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-neutral-50 p-3 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            <div className="mb-1 text-[12px] font-semibold capitalize text-gray-800 dark:text-gray-100">
              {labels.property(field)}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 dark:bg-neutral-800/60">
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  {labels.old}:
                </span>
                <AppTooltip text={oldFormatted.full} className="min-w-0 flex-1">
                  <div
                    className="min-w-0 truncate text-[11px] text-gray-700 select-text dark:text-gray-200"
                    onDoubleClick={() => copyToClipboard(oldFormatted.full)}
                  >
                    {oldFormatted.display}
                  </div>
                </AppTooltip>
              </div>
              <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 dark:bg-neutral-800/60">
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  {labels.new}:
                </span>
                <AppTooltip text={newFormatted.full} className="min-w-0 flex-1">
                  <div
                    className="min-w-0 truncate text-[11px] text-gray-700 select-text dark:text-gray-200"
                    onDoubleClick={() => copyToClipboard(newFormatted.full)}
                  >
                    {newFormatted.display}
                  </div>
                </AppTooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
