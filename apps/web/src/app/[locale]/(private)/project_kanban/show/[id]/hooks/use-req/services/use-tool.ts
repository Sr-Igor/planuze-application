import { useProjectTool } from "@repo/api/web";
import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban } from "@repo/types";

import { State } from "../../../types";

export interface IUseToolProps {
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useTool = ({ state, id, kanban, onSuccess }: IUseToolProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_tool");

  const requests = useProjectTool({
    id: state?.tool?.id,
    enabledIndex: !!id && perm.index,
    enableTrash: state.type === "tool" && state.modes?.includes("trash") && perm.trash,
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
