import { format } from "date-fns";

import { useLang } from "@repo/language/hooks";
import { billing_error } from "@repo/types";
import { TableColumn } from "@repo/ui";

export const useTable = () => {
  const t = useLang();

  const columns: TableColumn<billing_error>[] = [
    {
      title: t.property("company"),
      accessor: "company.name",
      sortable: true,
    },
    {
      title: t.property("event"),
      accessor: "event_id",
      sortable: true,
    },
    {
      title: t.property("error"),
      accessor: "error",
      sortable: true,
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      sortable: true,
      formatValue: (item: billing_error) =>
        item?.createdAt && format(item.createdAt, "dd/MM/yyyy HH:mm"),
    },
  ];

  return {
    columns,
  };
};
