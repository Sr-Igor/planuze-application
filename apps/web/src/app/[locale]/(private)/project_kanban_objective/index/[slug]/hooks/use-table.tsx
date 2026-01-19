import { project_kanban_objective } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { StatusCircle, TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<project_kanban_objective>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 200,
      customRender: (item) => {
        return (
          <p>
            [{item.public_id}] {item.title}
          </p>
        );
      },
    },
    {
      title: t.property("concluded"),
      accessor: "concluded",
      sortable: true,
      centered: true,
      width: 150,
      customRender: (item) => {
        return <StatusCircle status={item.concluded} />;
      },
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
