import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { kanban_template_tag } from "@/api/generator/types";
import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<kanban_template_tag>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("deletedAt"),
      accessor: "deletedAt",
      centered: true,
      sortable: true,
      customRender: (item) => {
        return item.deletedAt ? dates.format(new Date(item.deletedAt)) : "-";
      },
    },
  ];

  return { columns };
};
