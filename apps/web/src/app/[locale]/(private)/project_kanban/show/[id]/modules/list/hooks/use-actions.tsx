import { Eye, Pen, Trash } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { TableAction } from "@repo/ui-new";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useAccess } from "@/hooks/access";

export const useActions = () => {
  const { permissions } = useAccess();
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
