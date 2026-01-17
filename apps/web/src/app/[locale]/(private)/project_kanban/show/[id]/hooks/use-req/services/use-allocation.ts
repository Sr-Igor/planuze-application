import { useProjectKanbanCycleAllocation } from '@repo/api/web/callers/project_kanban_cycle_allocation';
import { useAccess } from '@/hooks/access';

import { State } from '../../../types';

export interface IUseAllocationProps {
    state: State;
    id: string;
    cycleId?: string;
    onSuccess: () => void;
}

export const useAllocation = ({ state, id, cycleId, onSuccess }: IUseAllocationProps) => {
    const { permissions } = useAccess();
    const perm = permissions('project_kanban_cycle');

    const requests = useProjectKanbanCycleAllocation({
        id: state?.allocation?.id,
        enabledIndex: !!id && perm.index,
        enableTrash: state.type === 'allocation' && state.modes?.includes('trash') && perm.trash,
        filters: {
            project_kanban_id: id,
            project_kanban_cycle_id: cycleId
        },
        trashFilters: {
            project_kanban_cycle_id: cycleId
        },
        callbacks: {
            store: { onSuccess },
            update: { onSuccess },
            destroy: { onSuccess },
            restore: { onSuccess }
        }
    });

    return requests;
};
