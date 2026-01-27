import { useProjectKanban } from "@repo/api/web";
import { useUserAccess } from "@repo/redux/hooks";

export interface IUseKanbanProps {
  id: string;
}

export const useKanban = ({ id }: IUseKanbanProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban");

  const { show } = useProjectKanban({ enabledShow: !!id && perm.show, id });

  return { show };
};
