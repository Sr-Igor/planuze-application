import { useProjectKanban } from '@repo/api/web/callers/project_kanban';
import { useAccess } from '@/hooks/access';

export interface IUseKanbanProps {
    id: string;
}

export const useKanban = ({ id }: IUseKanbanProps) => {
    const { permissions } = useAccess();
    const perm = permissions('project_kanban');

    const { show } = useProjectKanban({ enabledShow: !!id && perm.show, id });

    return { show };
};
