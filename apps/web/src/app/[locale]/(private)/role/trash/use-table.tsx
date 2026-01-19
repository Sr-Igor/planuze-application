import { role } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<role>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
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
