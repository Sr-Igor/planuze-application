import { kanban_template } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<kanban_template>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
    },
    {
      title: t.property("created_by"),
      accessor: "profile.user.name",
      sortable: true,
    },
    {
      title: t.property("deletedAt"),
      accessor: "deletedAt",
      customRender: (item) => {
        return item.deletedAt ? dates.format(new Date(item.deletedAt)) : "-";
      },
      sortable: true,
      centered: true,
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
