import { client } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { AppAvatar } from "@/components/ui/app-avatar";
import { useIntlFormat } from "@/hooks/intl-format";
import { IUseHookProps } from "@/templates/list/base/types";

export const useTable = (_: IUseHookProps<client>) => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<client>[] = [
    {
      title: t.property("name"),
      accessor: "name",
      sortable: true,
      width: 200,
      customRender: (item) => {
        return (
          <span className="flex items-center gap-2">
            <AppAvatar
              src={item?.avatar || ""}
              path={"client/avatar"}
              name={item?.name || ""}
              className="h-7 w-7"
            />
            <p>{item?.name}</p>
          </span>
        );
      },
    },
    {
      title: t.property("phone"),
      accessor: "phone",
      sortable: true,
      centered: true,
      width: 150,
      breakpoint: 720,
    },
    {
      title: t.property("email"),
      accessor: "email",
      sortable: true,
      centered: true,
      width: 200,
      breakpoint: 720,
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
