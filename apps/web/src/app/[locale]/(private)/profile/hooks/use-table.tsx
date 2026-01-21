import { useIntlFormat, useLang } from "@repo/language/hooks";
import { profile } from "@repo/types";
import { AppAvatarLine, StatusCircle, TableColumn } from "@repo/ui";

import { IUseHookProps } from "@/templates/list/base/types";

export const useTable = ({ profile }: IUseHookProps<profile> & { profile?: profile }) => {
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
      breakpoint: 720,
      width: 200,
      customRender: (item) => item.user?.email || item.anonymous_email || "-",
    },
    {
      title: t.property("level_id"),
      accessor: "level.title",
      sortable: true,
      centered: true,
      width: 150,
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
      title: t.property("anonymous"),
      accessor: "anonymous",
      sortable: true,
      centered: true,
      width: 80,
      formatValue: (item) => <StatusCircle status={item.anonymous} />,
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

  return { columns, disabledCheckbox: (item: profile) => item.owner || item.id === profile?.id };
};
