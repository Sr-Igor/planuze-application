import { useProjectKanbanCycle } from "@repo/api/web";
import { project_kanban } from "@repo/types";

import { useAccess } from "@/hooks/access";

import { State } from "../../../types";

export interface IUseCycleProps {
  cycleId?: string;
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useCycle = ({ cycleId, state, id, kanban, onSuccess }: IUseCycleProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle");

  const requests = useProjectKanbanCycle({
    id: cycleId,
    enabledShow: !!cycleId && !!kanban?.id && perm.show,
    enableTrash: state.type === "cycle" && state.modes?.includes("trash") && perm.trash,
    filters: {
      project_kanban_id: id,
    },
    callbacks: {
      store: { onSuccess },
      update: { onSuccess },
      destroy: { onSuccess },
      many: { onSuccess },
      restore: { onSuccess },
    },
  });

  return requests;
};
