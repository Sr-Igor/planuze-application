import { useLang } from "@repo/language/hook";
import { TableColumn } from "@repo/ui/app";

import { profile } from "@/api/generator/types";
import { AppAvatarLine } from "@/components/ui/app-avatar-line";
import { useIntlFormat } from "@/hooks/intl-format";

export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<profile>[] = [
    {
      title: t.property("name"),
      accessor: "user.name",
      sortable: true,
      width: 200,
      customRender: (item, loading) => {
        return (
          <AppAvatarLine
            loading={loading}
            name={item?.user?.name || item.anonymous_name}
            avatar={item?.user?.avatar || item.anonymous_avatar}
            internal={item.anonymous}
          />
        );
      },
    },
    {
      title: t.property("email"),
      accessor: "user.email",
      sortable: true,
    },
    {
      title: t.property("level_id"),
      accessor: "level.title",
      sortable: true,
      centered: true,
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
