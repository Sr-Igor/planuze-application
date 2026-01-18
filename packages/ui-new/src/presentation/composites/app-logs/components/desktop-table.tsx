import { AppTooltip } from "../../app-tooltip";
import type { DiffItem, FormattedValue, LogsLabels } from "../types";

interface DesktopTableProps<T> {
  diffs: DiffItem[];
  formatDisplayValue: (field: keyof T | undefined, value: unknown, maxLength: number) => FormattedValue;
  copyToClipboard: (text: string) => void;
  labels: LogsLabels;
}

export const DesktopTable = <T,>({
  diffs,
  formatDisplayValue,
  copyToClipboard,
  labels,
}: DesktopTableProps<T>) => {
  if (diffs.length === 0) {
    return (
      <p className="p-3 text-xs text-gray-500 dark:text-gray-400">{labels.nothingAction}</p>
    );
  }

  return (
    <table className="w-full max-w-full min-w-[400px] text-left text-xs sm:text-sm">
      <thead className="bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <tr>
          <th className="px-3 py-2">{labels.field}</th>
          <th className="px-3 py-2">{labels.old}</th>
          <th className="px-3 py-2">{labels.new}</th>
        </tr>
      </thead>
      <tbody>
        {diffs.map(({ field, oldValue, newValue }, i) => {
          const oldFormatted = formatDisplayValue(field as keyof T, oldValue, 80);
          const newFormatted = formatDisplayValue(field as keyof T, newValue, 80);

          return (
            <tr key={field + i}>
              <td className="truncate px-3 py-2 text-xs font-medium capitalize break-all">
                {labels.property(field)}
              </td>
              <td className="max-w-[200px] px-3 py-2 text-xs">
                <AppTooltip text={oldFormatted.full} className="block w-full">
                  <div
                    className="block w-full truncate select-text"
                    onDoubleClick={() => copyToClipboard(oldFormatted.full)}
                  >
                    {oldFormatted.display}
                  </div>
                </AppTooltip>
              </td>
              <td className="max-w-[200px] px-3 py-2 text-xs">
                <AppTooltip text={newFormatted.full} className="block w-full">
                  <div
                    className="block w-full truncate text-gray-700 select-text dark:text-gray-200"
                    onDoubleClick={() => copyToClipboard(newFormatted.full)}
                  >
                    {newFormatted.display}
                  </div>
                </AppTooltip>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
