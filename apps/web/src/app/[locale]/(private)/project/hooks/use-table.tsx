import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { project } from "@/api/generator/types";
import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<project>[] = [
    {
      title: t.property("name"),
      accessor: "name",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("client"),
      accessor: "client.name",
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
