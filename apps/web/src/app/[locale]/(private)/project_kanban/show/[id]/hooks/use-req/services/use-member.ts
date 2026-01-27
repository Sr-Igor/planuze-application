import { useProjectMember } from "@repo/api/web";
import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban } from "@repo/types";

import { State } from "../../../types";

export interface IUseMemberProps {
  state: State;
  id: string;
  kanban?: project_kanban;
  onSuccess: () => void;
}

export const useMember = ({ state, kanban, onSuccess }: IUseMemberProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_member");

  const requests = useProjectMember({
    id: state?.member?.id,
    enabledIndex: !!kanban?.project_id && perm.index,
    enableTrash: state.type === "member" && state.modes?.includes("trash") && perm.trash,
    filters: {
      project_id: kanban?.project_id,
    },
    callbacks: {
      store: { onSuccess },
      destroy: { onSuccess },
      restore: { onSuccess },
    },
  });

  return requests;
};
