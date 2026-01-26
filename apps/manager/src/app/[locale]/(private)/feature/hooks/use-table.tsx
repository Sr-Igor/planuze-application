import { format } from "date-fns";
import { Check, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { feature } from "@repo/types";
import { cn, Icon, TableColumn } from "@repo/ui";

export const useTable = () => {
  const t = useLang();

  const columns: TableColumn<feature>[] = [
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
      width: 230,
      formatValue: (item: feature) => {
        return (
          <div className="flex items-center gap-2">
            <Icon name={item.icon || "Circle"} />
            <span>{item.title}</span>
          </div>
        );
      },
    },
    {
      title: t.property("path"),
      accessor: "path",
      sortable: true,
      width: 230,
    },
    {
      title: t.property("group"),
      accessor: "group",
      sortable: true,
      width: 180,
    },
    {
      title: t.property("route"),
      accessor: "route",
      sortable: true,
      width: 180,
    },

    {
      title: t.property("reference"),
      accessor: "reference",
      sortable: true,
      width: 220,
    },
    {
      title: t.property("module_id"),
      accessor: "module.title",
      width: 100,
    },
    {
      title: t.property("sidebar"),
      accessor: "sidebar",
      sortable: true,
      centered: true,
      width: 200,
      formatValue: (item: feature) => (
        <div
          className={cn(
            item.sidebar ? "bg-green-500" : "bg-red-500",
            "flex h-6 w-6 items-center justify-center rounded-full"
          )}
        >
          {item.sidebar ? (
            <Check className="text-white" size={16} strokeWidth={3} />
          ) : (
            <X className="text-white" size={16} strokeWidth={3} />
          )}
        </div>
      ),
    },
    {
      title: t.property("show_plan"),
      accessor: "show_plan",
      sortable: true,
      centered: true,
      width: 120,
      formatValue: (item: feature) => (
        <div
          className={cn(
            item.show_plan ? "bg-green-500" : "bg-red-500",
            "flex h-6 w-6 items-center justify-center rounded-full"
          )}
        >
          {item.show_plan ? (
            <Check className="text-white" size={16} strokeWidth={3} />
          ) : (
            <X className="text-white" size={16} strokeWidth={3} />
          )}
        </div>
      ),
    },
    {
      title: t.property("active"),
      accessor: "deleted",
      sortable: true,
      centered: true,
      width: 120,
      formatValue: (item: feature) => (
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
      width: 180,
      formatValue: (item: feature) => item?.createdAt && format(item.createdAt, "dd/MM/yyyy HH:mm"),
    },
  ];

  return {
    columns,
  };
};
