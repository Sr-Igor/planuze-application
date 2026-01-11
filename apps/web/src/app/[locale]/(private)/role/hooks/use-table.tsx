import { useLocale } from "next-intl";

import { role } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { StatusCircle, TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";
import { formatCurrency } from "@/utils/currency";

export const useTable = () => {
  const t = useLang();
  const locale = useLocale();
  const { dates } = useIntlFormat();

  const columns: TableColumn<role>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("cost_center_id"),
      accessor: "cost_center.title",
      width: 200,
      breakpoint: 720,
    },
    {
      title: t.property("pay"),
      accessor: "pay",
      sortable: true,
      centered: true,
      width: 150,
      formatValue: (item) => formatCurrency(item.pay, item.currency, locale),
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
