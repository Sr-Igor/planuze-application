import { format } from "date-fns";
import { Check, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { action } from "@repo/types";
import { cn, TableColumn } from "@repo/ui";

export const useTable = () => {
  const t = useLang();

  const columns: TableColumn<action>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      // width: '300px'
    },
    {
      title: t.property("active"),
      accessor: "deleted",
      sortable: true,
      centered: true,
      formatValue: (item: action) => (
        <div
          className={cn(
            !item.deleted ? "bg-green-500" : "bg-red-500",
            "flex h-6 w-6 items-center justify-center rounded-full"
          )}
        >
          {!item.deleted ? (
            <Check className="text-white" size={16} strokeWidth={3} />
          ) : (
            <X className="text-white" size={16} strokeWidth={3} />
          )}
        </div>
      ),
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      sortable: true,
      formatValue: (item: action) => item?.createdAt && format(item.createdAt, "dd/MM/yyyy HH:mm"),
    },
  ];

  return {
    columns,
  };
};
