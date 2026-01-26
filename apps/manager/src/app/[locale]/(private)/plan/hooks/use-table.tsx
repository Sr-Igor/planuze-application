import { useLocale } from "next-intl";

import { format } from "date-fns";
import { Check, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { plan } from "@repo/types";
import { cn, Icon, TableColumn } from "@repo/ui";
import { formatCurrency } from "@repo/utils";

export const useTable = () => {
  const t = useLang();
  const locale = useLocale();

  const columns: TableColumn<plan>[] = [
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
      width: 200,
      formatValue: (item: plan) => {
        return (
          <div className="flex items-center gap-2">
            <Icon name={item.icon || "Circle"} />
            <span>{item.title}</span>
          </div>
        );
      },
    },
    {
      title: t.property("price"),
      accessor: "price",
      formatValue: (item: plan) => {
        return item.price ? formatCurrency(item.price, item.currency, locale) : "Free";
      },
    },
    {
      title: t.property("billing_model"),
      accessor: "billing_model",
      sortable: true,
      centered: true,
      width: 200,
    },
    {
      title: t.property("free_test"),
      accessor: "free_test",
      sortable: true,
      centered: true,
      formatValue: (item: plan) => {
        return item.free_test ? `${item.free_test} ${t.helper("days")}` : "-";
      },
    },
    {
      title: t.property("licenses"),
      accessor: "licenses",
      sortable: true,
      centered: true,
      width: 120,
    },
    {
      title: t.property("is_popular"),
      accessor: "is_popular",
      centered: true,
      width: 120,
      formatValue: (item: plan) => (
        <div
          className={cn(
            item.is_popular ? "bg-green-500" : "bg-red-500",
            "flex h-6 w-6 items-center justify-center rounded-full"
          )}
        >
          {item.is_popular ? (
            <Check className="text-white" size={16} strokeWidth={3} />
          ) : (
            <X className="text-white" size={16} strokeWidth={3} />
          )}
        </div>
      ),
    },
    {
      title: t.property("company"),
      accessor: "company.name",
      sortable: true,
    },
    {
      title: t.property("active"),
      accessor: "deleted",
      centered: true,
      width: 120,
      formatValue: (item: plan) => (
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
      formatValue: (item: plan) => item?.createdAt && format(item.createdAt, "dd/MM/yyyy HH:mm"),
    },
  ];

  return {
    columns,
  };
};
