import { project_kanban_objective } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui";

import { CheckboxInfinitySelect } from "@repo/form";

import { useKanbanShow } from "../../../context";

export interface ObjectiveProps {
  value: any;
  setValue: (value: any) => void;
}

export const Objective = ({ value, setValue }: ObjectiveProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { select } = useKanbanShow();

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.objective`)}
      </Label>
      <CheckboxInfinitySelect
        className="text-foreground w-full xl:w-40"
        index={select.objective}
        search={select.search.objective}
        setSearch={(search) => select.handleSearch("objective", search)}
        formatter={(items: project_kanban_objective[]) => {
          return items.map((item) => ({
            label: item.title,
            value: item.id,
            item,
          }));
        }}
        value={value?.split(",")?.filter(Boolean) || []}
        onChange={(value) => {
          setValue(value?.join(",") || undefined);
        }}
      />
    </div>
  );
};
