import { useProjectKanbanCycleCardType } from "@repo/api/web";

import { useAccess } from "@/hooks/access";

import { State } from "../../../types";

export interface IUseCardTypeProps {
  state: State;
  id: string;
  cycleId?: string;
  onSuccess: () => void;
}

export const useCardType = ({ state, id, cycleId, onSuccess }: IUseCardTypeProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban");

  const requests = useProjectKanbanCycleCardType({
    id: state?.cardType?.id,
    enabledIndex: !!id && perm.index,
    enableTrash: state.type === "cardType" && state.modes?.includes("trash") && perm.trash,
    filters: {
      project_kanban_id: id,
      project_kanban_cycle_id: cycleId,
    },
    trashFilters: {
      project_kanban_id: id,
    },
    callbacks: {
      store: { onSuccess },
      update: { onSuccess },
      destroy: { onSuccess },
      restore: { onSuccess },
    },
  });

  return requests;
};
