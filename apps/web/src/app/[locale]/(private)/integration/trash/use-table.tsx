import { integration } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui-new";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<integration>[] = [
    {
      title: t.property("name"),
      accessor: "name",
      sortable: true,
    },
    {
      title: t.property("expire_in"),
      accessor: "expire_in",
      centered: true,
      sortable: true,
      customRender: (item) => {
        return item.expire_in ? dates.format(new Date(item.expire_in)) : "-";
      },
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
