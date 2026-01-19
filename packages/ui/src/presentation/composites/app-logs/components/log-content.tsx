import type { DiffItem, FormattedValue, LogsLabels } from "../types";
import { DesktopTable } from "./desktop-table";
import { MobileCard } from "./mobile-card";

interface LogContentProps<T> {
  diffs: DiffItem[];
  formatDisplayValue: (field: keyof T | undefined, value: unknown, maxLength: number) => FormattedValue;
  copyToClipboard: (text: string) => void;
  labels: LogsLabels;
}

export const LogContent = <T,>({
  diffs,
  formatDisplayValue,
  copyToClipboard,
  labels,
}: LogContentProps<T>) => {
  return (
    <div>
      <div className="block md:hidden">
        <MobileCard
          diffs={diffs}
          formatDisplayValue={formatDisplayValue}
          copyToClipboard={copyToClipboard}
          labels={labels}
        />
      </div>

      <div className="hidden w-full overflow-x-auto md:block">
        <DesktopTable
          diffs={diffs}
          formatDisplayValue={formatDisplayValue}
          copyToClipboard={copyToClipboard}
          labels={labels}
        />
      </div>
    </div>
  );
};
