import { format } from "date-fns";
import { Check, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { module } from "@repo/types";
import { cn, Icon, TableColumn } from "@repo/ui";

export const useTable = () => {
  const t = useLang();

  const columns: TableColumn<module>[] = [
    {
      title: t.property("order"),
      accessor: "order",
      sortable: true,
      width: 80,
      centered: true,
    },
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      formatValue: (item: module) => {
        return (
          <div className="flex items-center gap-2">
            <Icon name={item.icon || "Circle"} />
            <span>{item.title}</span>
          </div>
        );
      },
    },
    {
      title: t.property("company"),
      accessor: "company.name",
    },
    {
      title: t.property("active"),
      accessor: "deleted",
      sortable: true,
      centered: true,
      formatValue: (item: module) => (
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
      formatValue: (item: module) => item?.createdAt && format(item.createdAt, "dd/MM/yyyy HH:mm"),
    },
  ];

  return {
    columns,
  };
};
