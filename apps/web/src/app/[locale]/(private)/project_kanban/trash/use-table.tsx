import { project_kanban } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<project_kanban>[] = [
    {
      title: t.property("project_id"),
      accessor: "project.name",
      sortable: true,
    },
    {
      title: t.property("deletedAt"),
      accessor: "deletedAt",
      centered: true,
      sortable: true,
      breakpoint: 720,
      width: 200,
      customRender: (item) => {
        return item.deletedAt ? dates.format(new Date(item.deletedAt)) : "-";
      },
    },
  ];

  return { columns };
};
