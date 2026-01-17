import { work_type } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<work_type>[] = [
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
