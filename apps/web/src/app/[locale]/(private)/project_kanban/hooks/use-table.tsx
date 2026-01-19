import { project_kanban } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<project_kanban>[] = [
    {
      title: t.property("project_id"),
      accessor: "project.name",
      width: 250,
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      centered: true,
      sortable: true,
      width: 150,
      breakpoint: 1024,
      formatValue: (item) => {
        return item.createdAt ? dates.format(new Date(item.createdAt)) : "-";
      },
    },
  ];

  return { columns };
};
