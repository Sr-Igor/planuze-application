import { cost_center } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { StatusCircle, TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<cost_center>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("active"),
      accessor: "active",
      sortable: true,
      centered: true,
      width: 80,
      formatValue: (item) => <StatusCircle status={item.active} />,
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
