import { useLang } from "@repo/language/hook";
import { AppCardSelector, TableColumn } from "@repo/ui/app";

import { project_kanban_cycle_card } from "@/api/generator/types";
import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<project_kanban_cycle_card>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
      customRender: (item) => {
        return (
          <AppCardSelector
            item={item}
            showPath={false}
            showPublicId={true}
            className="w-[250px] overflow-hidden"
          />
        );
      },
    },
    {
      title: t.property("project_kanban_cycle"),
      accessor: "project_kanban_cycle.title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("project_kanban_cycle_card_type"),
      accessor: "project_kanban_cycle_card_type.title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("project_kanban_cycle_column"),
      accessor: "project_kanban_cycle_column.title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      centered: true,
      sortable: true,
      breakpoint: 720,
      width: 200,
      customRender: (item) => {
        return item.createdAt ? dates.format(new Date(item.createdAt)) : "-";
      },
    },
  ];

  return { columns };
};
