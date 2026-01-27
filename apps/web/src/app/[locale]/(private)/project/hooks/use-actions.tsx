import { useRouter } from "next/navigation";

import { ChartNoAxesGantt, Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { project } from "@repo/types";
import { TableAction } from "@repo/ui";

import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<project>) => {
  const t = useLang();
  const { permissions } = useUserAccess();
  const router = useRouter();

  const perm = permissions();

  const actions: TableAction<project>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        router.push(`/project/show/${item.id}`);
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.update && perm.show,
    },
    {
      label: t.helper("kanban"),
      icon: <ChartNoAxesGantt />,
      onClick: (item) => {
        router.push(`/project_kanban/show/${item.project_kanbans?.[0]?.id}`);
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: (item) => permissions("project_kanban").show && !!item?.project_kanbans?.length,
    },
    {
      label: t.helper("delete"),
      variant: "destructive",
      separatorTop: true,
      icon: <Trash />,
      onClick: (item) => {
        handleState({ item, open: true, mode: "destroy" });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.destroy,
    },
  ];

  return { actions };
};
