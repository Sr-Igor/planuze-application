import { invite } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { StatusCircle, TableColumn } from "@repo/ui/app";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<invite>[] = [
    {
      title: t.property("email"),
      accessor: "email",
      sortable: true,
      width: 250,
    },
    {
      title: t.property("level_id"),
      accessor: "level.title",
      sortable: false,
      width: 200,
    },
    {
      title: t.property("accepted"),
      accessor: "accepted",
      sortable: true,
      centered: true,
      width: 120,
      formatValue: (item) => <StatusCircle status={item.accepted} />,
    },
    {
      title: t.property("feedback_in"),
      accessor: "feedback_in",
      centered: true,
      sortable: true,
      width: 180,
      breakpoint: 1024,
      formatValue: (item) => {
        return item.feedback_in ? dates.format(new Date(item.feedback_in)) : "-";
      },
    },
    {
      title: t.property("expire_date"),
      accessor: "expire_date",
      centered: true,
      sortable: true,
      width: 150,
      breakpoint: 1024,
      formatValue: (item) => {
        return item.expire_date ? dates.format(new Date(item.expire_date)) : "-";
      },
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      centered: true,
      sortable: true,
      width: 150,
      breakpoint: 1024,
      formatValue: (item) => {
        return item.createdAt ? dates.format(new Date(item.createdAt)) : "-";
      },
    },
  ];

  return { columns };
};
