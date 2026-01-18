import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui-new";

import { CalendarRange } from "@repo/form";

import { FilterKey } from "../types";

export interface CreatedAtProps {
  values: Record<string, undefined | Date>;
  loading: boolean;
  objectKeys: Partial<Record<FilterKey, string>>;
  handleDateFilters: (data: Partial<Record<FilterKey, string | undefined>>) => void;
}

export const CreatedAt = ({ values, loading, handleDateFilters, objectKeys }: CreatedAtProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="w-full min-w-[200px] xl:w-55">
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.created_at`)}
      </Label>
      <CalendarRange
        disabled={loading}
        dateRange={{
          from: values.startDate,
          to: values.endDate,
        }}
        setDateRange={(range) => {
          if (objectKeys.startDate && objectKeys.endDate) {
            handleDateFilters({
              [objectKeys.startDate]: range?.from ? range?.from.toISOString() : undefined,
              [objectKeys.endDate]: range?.to ? range?.to.toISOString() : undefined,
            });
          }
        }}
        className="h-10 w-full"
      />
    </div>
  );
};
