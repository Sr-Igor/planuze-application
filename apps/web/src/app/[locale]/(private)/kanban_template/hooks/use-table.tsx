import { kanban_template } from "@repo/api/generator/types";
import { StatusCircle, TableColumn } from "@repo/ui/app";

export const useTable = () => {
  const t = useLang();

  const columns: TableColumn<kanban_template>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
    },
    {
      title: t.property("created_by"),
      accessor: "profile.user.name",
      sortable: true,
      centered: true,
      width: 200,
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
