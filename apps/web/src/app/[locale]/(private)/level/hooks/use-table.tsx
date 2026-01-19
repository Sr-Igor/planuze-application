import { level, profile } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { StatusCircle, TableColumn } from "@repo/ui";

import { IUseHookProps } from "@/templates/list/base/types";

export const useTable = ({ profile }: IUseHookProps<level> & { profile?: profile }) => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<level>[] = [
    {
      title: t.property("title"),
      accessor: "title",
      sortable: true,
      width: 150,
    },
    {
      title: t.property("active"),
      accessor: "active",
      formatValue: (item) => <StatusCircle status={item.active} />,
      sortable: true,
      centered: true,
      width: 100,
    },
    {
      title: t.property("admin"),
      accessor: "administrator",
      formatValue: (item) => <StatusCircle status={item.administrator} />,
      breakpoint: 500,
      sortable: true,
      centered: true,
      width: 150,
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

  return {
    columns,
    disabledCheckbox: (item: level) => item.administrator || item.id === profile?.level_id,
  };
};
