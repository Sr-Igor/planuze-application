import { useRouter } from "next/navigation";

import { Eye, Pen, Trash } from "lucide-react";

import { project_kanban_objective } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { TableAction } from "@repo/ui/app";

import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<project_kanban_objective>) => {
  const route = useRouter();
  const { permissions } = useAccess();
  const perm = permissions();
  const t = useLang();

  const actions: TableAction<project_kanban_objective>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        route.push(
          `/project_kanban_objective/show/${item.project_kanban_id}-${item.project_id}-${item.project?.name}/${item.id}`
        );
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.update && perm.show,
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
