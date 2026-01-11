import { DiffItem, FormattedValue } from "../types";
import { DesktopTable } from "./desktop-table";
import { MobileCard } from "./mobile-card";

interface LogContentProps<T> {
  diffs: DiffItem[];
  formatDisplayValue: (field: keyof T | undefined, value: any, maxLength: number) => FormattedValue;
  copyToClipboard: (text: string) => void;
}

export const LogContent = <T,>({
  diffs,
  formatDisplayValue,
  copyToClipboard,
}: LogContentProps<T>) => {
  return (
    <div>
      <div className="block md:hidden">
        <MobileCard
          diffs={diffs}
          formatDisplayValue={formatDisplayValue}
          copyToClipboard={copyToClipboard}
        />
      </div>

      <div className="hidden w-full overflow-x-auto md:block">
        <DesktopTable
          diffs={diffs}
          formatDisplayValue={formatDisplayValue}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
};
