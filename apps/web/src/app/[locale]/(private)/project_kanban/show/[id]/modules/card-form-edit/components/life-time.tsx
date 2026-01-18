import { project_kanban_cycle_card } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";


export interface LifeTimeProps {
  item?: project_kanban_cycle_card;
  name?: string;
}

export const LifeTime = ({ item, name }: LifeTimeProps) => {
  const t = useLang();
  const { dates } = useIntlFormat();
  const tKanban = t.page.kanban;

  return (
    <div className="flex w-48 flex-col overflow-hidden px-2 text-[12px]">
      <span className="line-clamp-1 truncate text-end">
        {tKanban("card-form-edit.project")}: {name}
      </span>
      {item?.createdAt && (
        <span className="text-end">
          {tKanban("card-form-edit.created_at")}: {dates.format(new Date(item?.createdAt))}
        </span>
      )}
      {item?.updatedAt && (
        <span className="text-end">
          {tKanban("card-form-edit.updated_at")}: {dates.format(new Date(item?.updatedAt))}
        </span>
      )}
    </div>
  );
};
