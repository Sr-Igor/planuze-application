import { useProjectConfig } from "@repo/api/web";
import { project_kanban } from "@repo/types";

import { useAccess } from "@/hooks/access";

import { State } from "../../../types";

export interface IUseConfigProps {
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useConfig = ({ state, kanban, onSuccess }: IUseConfigProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_config");

  const requests = useProjectConfig({
    id: state?.config?.id,
    enabledIndex: !!kanban?.project_id && perm.index,
    enableTrash: state.type === "config" && state.modes?.includes("trash") && perm.trash,
    filters: {
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
