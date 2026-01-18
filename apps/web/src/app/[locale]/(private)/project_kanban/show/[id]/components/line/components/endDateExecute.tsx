import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui-new";

import { CalendarRange } from "@repo/form";

import { FilterKey } from "../types";

export interface EndDateExecuteProps {
  values: Record<string, undefined | Date>;
  loading: boolean;
  objectKeys: Partial<Record<FilterKey, string>>;
  handleDateFilters: (data: Partial<Record<FilterKey, string | undefined>>) => void;
}

export const EndDateExecute = ({
  values,
  loading,
  handleDateFilters,
  objectKeys,
}: EndDateExecuteProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="w-full min-w-[200px] xl:w-55">
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.end_date_execute`)}
      </Label>
      <CalendarRange
        disabled={loading}
        dateRange={{
          from: values.end_date_execute_start,
          to: values.end_date_execute_end,
        }}
        setDateRange={(range) => {
          if (objectKeys.end_date_execute_start && objectKeys.end_date_execute_end) {
            handleDateFilters({
              [objectKeys.end_date_execute_start]: range?.from
                ? range?.from.toISOString()
                : undefined,
              [objectKeys.end_date_execute_end]: range?.to ? range?.to.toISOString() : undefined,
            });
          }
        }}
        className="h-10 w-full"
      />
    </div>
  );
};
