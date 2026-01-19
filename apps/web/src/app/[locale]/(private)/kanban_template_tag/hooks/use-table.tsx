import { kanban_template_tag } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui";


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
      title: t.property("createdAt"),
      accessor: "createdAt",
      centered: true,
      sortable: true,
      breakpoint: 1024,
      width: 200,
      customRender: (item) => {
        return item.createdAt ? dates.format(new Date(item.createdAt)) : "-";
      },
    },
  ];

  return { columns };
};
