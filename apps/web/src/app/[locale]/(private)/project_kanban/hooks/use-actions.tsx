import { useRouter } from "next/navigation";

import { ChartNoAxesGantt, Presentation, Target, Trash } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { TableAction } from "@repo/ui/app";

import { project_kanban } from "@/api/generator/types";
import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<project_kanban>) => {
  const { permissions } = useAccess();
  const perm = permissions();
  const t = useLang();
  const router = useRouter();

  const actions: TableAction<project_kanban>[] = [
    {
      label: t.helper("management"),
      icon: <ChartNoAxesGantt />,
      onClick: (item) => {
        router.push(`/project_kanban/show/${item.id}`);
      },

      isDisabled: () => state.loadingLines.length > 0,
      isVisible: (item) => perm.show,
    },
    {
      label: t.helper("objetives_and_targets"),
      icon: <Target />,
      onClick: (item) => {
        router.push(
          `/project_kanban_objective/index/${item.id}-${item.project_id}-${item.project?.name}`
        );
      },

      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => permissions("project_kanban_objective").index,
    },
    {
      label: t.helper("see_project"),
      icon: <Presentation />,
      onClick: (item) => {
        router.push(`/project/show/${item.project_id}`);
      },

      isDisabled: () => state.loadingLines.length > 0,
      isVisible: (item) => permissions("project").show,
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
