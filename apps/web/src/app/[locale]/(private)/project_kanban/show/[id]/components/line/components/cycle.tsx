import { project_kanban_cycle } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { CheckboxSelect } from "@/components/form/select/cases/checkbox";
import { SimpleSelect } from "@/components/form/select/cases/simple";
import { useIntlFormat } from "@/hooks/intl-format";

export interface CycleProps {
  isList: boolean;
  value: any;
  setValue: (value: any) => void;
  cycles: { label: string; value: string; item?: project_kanban_cycle }[];
  loading: boolean;
}

export const Cycle = ({ isList, value, setValue, cycles, loading }: CycleProps) => {
  const lang = useLang();
  const t = lang.page.kanban;
  const { dates } = useIntlFormat();

  return (
    <>
      {!isList && (
        <SimpleSelect
          options={cycles}
          value={value || cycles[0]?.value}
          placeholder={t("component.line.cycle")}
          loading={loading}
          className="text-foreground h-8 w-40"
          onChange={(value) => setValue(value)}
          clearable={false}
          customSelect={(item) => {
            const base = `${item?.title} (V${item?.project_version?.version})`;
            return item && base;
          }}
          containerClassName="w-auto max-w-96"
          formatterOptions={({ item }) => {
            const base = `${item.title} (V${item?.project_version?.version})`;

            if (item.start_date && item.end_date) {
              return `${base} - ${dates.formatDate(item.start_date)} - ${dates.formatDate(item.end_date)}`;
            }

            return base;
          }}
        />
      )}

      {isList && (
        <CheckboxSelect
          options={cycles || []}
          value={Array.isArray(value) ? value : value?.split(",")?.filter(Boolean) || []}
          placeholder={t("component.line.cycle")}
          className="text-foreground h-8 w-full"
          triggerClassName="w-40"
          containerClassName="w-auto max-w-96"
          loading={loading}
          onChange={(value) => setValue(value?.join(",") || undefined)}
          optionChildren={({ item }) => {
            const base = `${item.title} (V${item?.project_version?.version})`;

            if (item.start_date && item.end_date) {
              return `${base} - ${dates.formatDate(item.start_date)} - ${dates.formatDate(item.end_date)}`;
            }

            return base;
          }}
        />
      )}
    </>
  );
};
