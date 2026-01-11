import { project_kanban } from "@repo/api/generator/types";

import { useProjectTool } from "@/api/callers/project_tool";
import { useAccess } from "@/hooks/access";

import { State } from "../../../types";

export interface IUseToolProps {
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useTool = ({ state, id, kanban, onSuccess }: IUseToolProps) => {
  const { permissions } = useAccess();
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
