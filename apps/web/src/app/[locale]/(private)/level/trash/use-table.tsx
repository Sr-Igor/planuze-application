import { level } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<level>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
    },
    {
      title: t.property("active"),
      accessor: "active",
      customRender: (item) => {
        return item.active ? t.helper("true") : t.helper("false");
      },
      sortable: true,
      centered: true,
    },
    {
      title: t.property("admin"),
      accessor: "administrator",
      customRender: (item) => {
        return item.administrator ? t.helper("true") : t.helper("false");
      },
      sortable: true,
      centered: true,
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
