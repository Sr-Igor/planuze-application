import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui";

import { CalendarRange } from "@repo/form";

import { FilterKey } from "../types";

export interface EndDateEstimateProps {
  values: Record<string, undefined | Date>;
  loading: boolean;
  objectKeys: Partial<Record<FilterKey, string>>;
  handleDateFilters: (data: Partial<Record<FilterKey, string | undefined>>) => void;
}

export const EndDateEstimate = ({
  values,
  loading,
  handleDateFilters,
  objectKeys,
}: EndDateEstimateProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="w-full min-w-[200px] xl:w-55">
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.end_date_estimate`)}
      </Label>
      <CalendarRange
        disabled={loading}
        dateRange={{
          from: values.end_date_estimate_start,
          to: values.end_date_estimate_end,
        }}
        setDateRange={(range) => {
          if (objectKeys.end_date_estimate_start && objectKeys.end_date_estimate_end) {
            handleDateFilters({
              [objectKeys.end_date_estimate_start]: range?.from
                ? range?.from.toISOString()
                : undefined,
              [objectKeys.end_date_estimate_end]: range?.to ? range?.to.toISOString() : undefined,
            });
          }
        }}
        className="h-10 w-full"
      />
    </div>
  );
};
