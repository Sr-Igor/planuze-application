import { kanban_template_card_type } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Icon, StatusCircle, TableColumn } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<kanban_template_card_type>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
      customRender: (item) => {
        return (
          <div className="flex items-center gap-2">
            <Icon name={item.icon} className="h-4 w-4" style={{ color: item.color }} />
            <span>{item.title}</span>
          </div>
        );
      },
    },
    {
      title: t.property("principal"),
      accessor: "principal",
      sortable: true,
      width: 200,
      centered: true,
      customRender: (item) => {
        return <StatusCircle status={item.principal} />;
      },
    },
    {
      title: t.property("problem"),
      accessor: "problem",
      sortable: true,
      width: 200,
      centered: true,
      customRender: (item) => {
        return <StatusCircle status={item.problem} />;
      },
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
