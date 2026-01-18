import { kanban_template_card_type } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { Icon, StatusCircle, TableColumn } from "@repo/ui-new";


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
