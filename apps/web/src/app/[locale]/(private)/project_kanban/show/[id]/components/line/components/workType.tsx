import { work_type } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui-new";

import { CheckboxInfinitySelect } from "@repo/form";

import { useKanbanShow } from "../../../context";

export interface WorkTypeProps {
  value: any;
  setValue: (value: any) => void;
}

export const WorkType = ({ value, setValue }: WorkTypeProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { select } = useKanbanShow();

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.work_type`)}
      </Label>
      <CheckboxInfinitySelect
        className="text-foreground w-full xl:w-40"
        index={select.workType}
        search={select.search.workType}
        setSearch={(search) => select.handleSearch("workType", search)}
        formatter={(items: work_type[]) => {
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
