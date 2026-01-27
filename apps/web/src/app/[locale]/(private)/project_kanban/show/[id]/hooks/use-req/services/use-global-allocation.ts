import { useProjectAllocation } from "@repo/api/web";
import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban } from "@repo/types";

import { State } from "../../../types";

export interface IUseGlobalAllocationProps {
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useGlobalAllocation = ({
  state,
  id,
  kanban,
  onSuccess,
}: IUseGlobalAllocationProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_allocation");

  const requests = useProjectAllocation({
    id: state?.globalAllocation?.id,
    enabledIndex: !!id && perm.index,
    enableTrash: state.type === "globalAllocation" && state.modes?.includes("trash") && perm.trash,
    filters: {
      project_id: kanban?.project_id,
    },
    trashFilters: {
      project_id: kanban?.project_id,
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
