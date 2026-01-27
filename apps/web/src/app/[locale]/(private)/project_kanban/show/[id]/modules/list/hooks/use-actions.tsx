import { Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban_cycle_card } from "@repo/types";
import { TableAction } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";

export const useActions = () => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle_card");
  const t = useLang();

  const { state } = useKanbanShow();

  const actions: TableAction<project_kanban_cycle_card>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        state.card.update({ columnId: item.project_kanban_cycle_column_id, card: item });
      },
      isVisible: () => perm.update || perm.show,
    },
    {
      label: t.helper("delete"),
      variant: "destructive",
      separatorTop: true,
      icon: <Trash />,
      onClick: (item) => {
        state.card.delete(item);
      },
      isVisible: () => perm.destroy,
    },
  ];

  return { actions };
};
