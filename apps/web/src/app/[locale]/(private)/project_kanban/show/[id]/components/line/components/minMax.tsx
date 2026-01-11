import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Label } from "@repo/ui";

import { Numeric } from "@/components/form/numeric";
import { useDebounce } from "@/hooks/debounce";

import { FilterKey } from "../types";

export interface MinMaxProps {
  values: Partial<Record<FilterKey, string | undefined>>;
  keyItem: string;
  handleFilters: (key: FilterKey, value: string) => void;
}

export const MinMax = ({ keyItem, values, handleFilters }: MinMaxProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const minValue = values[`${keyItem}_min` as FilterKey];
  const maxValue = values[`${keyItem}_max` as FilterKey];

  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const minDebounced = useDebounce(min, 500);
  const maxDebounced = useDebounce(max, 500);

  useEffect(() => {
    handleFilters(`${keyItem}_min` as FilterKey, minDebounced);
  }, [minDebounced]);

  useEffect(() => {
    handleFilters(`${keyItem}_max` as FilterKey, maxDebounced);
  }, [maxDebounced]);

  useEffect(() => {
    minValue !== min && setMin(minValue || "");
    maxValue !== max && setMax(maxValue || "");
  }, [minValue, maxValue]);

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.${keyItem}`)}
      </Label>
      <div className="flex gap-2">
        <Numeric
          value={min}
          onChange={(value) => setMin(value)}
          className="w-full xl:w-17"
          placeholder={t("component.line.min")}
        />
        <Numeric
          value={max}
          onChange={(value) => setMax(value)}
          className="w-full xl:w-17"
          placeholder={t("component.line.max")}
        />
      </div>
    </div>
  );
};
