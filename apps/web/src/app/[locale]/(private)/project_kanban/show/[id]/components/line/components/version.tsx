import { project_version } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui";

import { CheckboxInfinitySelect } from "@repo/form";

import { useKanbanShow } from "../../../context";

export interface VersionProps {
  value: any;
  setValue: (value: any) => void;
}

export const Version = ({ value, setValue }: VersionProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { select } = useKanbanShow();

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.version`)}
      </Label>
      <CheckboxInfinitySelect
        className="text-foreground w-full xl:w-40"
        index={select.version}
        search={select.search.version}
        setSearch={(search) => select.handleSearch("version", search)}
        formatter={(items: project_version[]) => {
          return items.map((item) => ({
            label: `V${item.version}${item.name ? ` - ${item.name}` : ""}`,
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
