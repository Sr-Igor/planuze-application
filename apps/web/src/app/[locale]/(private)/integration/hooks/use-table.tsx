import { integration } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { StatusCircle, TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<integration>[] = [
    {
      title: t.property("name"),
      accessor: "name",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("active"),
      accessor: "active",
      width: 80,
      formatValue: (item) => <StatusCircle status={item.active} />,
      sortable: true,
      centered: true,
    },
    {
      title: t.property("expire_in"),
      accessor: "expire_in",
      centered: true,
      sortable: true,
      width: 150,
      breakpoint: 1024,
      formatValue: (item) => {
        return item.expire_in ? dates.format(new Date(item.expire_in)) : "-";
      },
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
