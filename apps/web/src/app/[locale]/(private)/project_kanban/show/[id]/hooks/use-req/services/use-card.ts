import { useProjectKanbanCycleCard } from '@/api/callers/project_kanban_cycle_card';
import { useAccess } from '@/hooks/access';

import { Mode, State } from '../../../types';
import { IParams } from '../../use-query/types';

export interface IUseCardProps {
    state: State;
    id: string;
    cycleId?: string;
    params: IParams;
    search: string;
    onSuccess: ({ keepModes }: { keepModes: Partial<Mode>[] }) => void;
}

export const useCard = ({ state, id, cycleId, params, search, onSuccess }: IUseCardProps) => {
    const { permissions } = useAccess();
    const perm = permissions('project_kanban_cycle_card');

    const requests = useProjectKanbanCycleCard({
        id: state?.card?.id,
        enabledIndex: params.view === 'list' && perm.index,
        enabledShow: !!state?.card?.id && state.type === 'card' && state.modes?.includes('update') && perm.show,
        enabledQuickIndex: !!search && perm.index,
        cycleId,
        enableTrash: state.type === 'card' && state.modes?.includes('trash') && perm.trash,
        filters: {
            //General
            project_kanban_id: id,

            //List
            search: params?.list_search,
            page: params?.page || 1,
            limit: params?.limit || 10,
            orderKey: params?.orderKey || 'createdAt',
            orderValue: params?.orderValue || 'desc',
            project_kanban_cycle_id: params?.list_cycle || undefined,
            card_type: params?.list_cardType || undefined,
            profile_id: params?.list_member || undefined,
            project_version_id: params?.list_version || undefined,
            work_type_id: params?.list_workType || undefined,
            project_kanban_objective_id: params?.list_objective || undefined,
            end_date_estimate_start: params?.list_end_date_estimate_start || undefined,
            end_date_estimate_end: params?.list_end_date_estimate_end || undefined,
            end_date_execute_start: params?.list_end_date_execute_start || undefined,
            end_date_execute_end: params?.list_end_date_execute_end || undefined,
            startDate: params?.list_startDate || undefined,
            endDate: params?.list_endDate || undefined,
            severity_min: params?.list_severity_min || undefined,
            severity_max: params?.list_severity_max || undefined,
            priority_min: params?.list_priority_min || undefined,
            priority_max: params?.list_priority_max || undefined,
            estimate_min: params?.list_estimate_min || undefined,
            estimate_max: params?.list_estimate_max || undefined,
            execute_min: params?.list_execute_min || undefined,
            execute_max: params?.list_execute_max || undefined,
            work_in_progress_min: params?.list_work_in_progress_min || undefined,
            work_in_progress_max: params?.list_work_in_progress_max || undefined,
            public_id: params?.list_public_id || undefined,

            //Quick Search
            quick_search: search
        },
        trashFilters: {
            project_kanban_id: id,
            trash_search: params?.trash_search
        },
        callbacks: {
            store: {
                onSuccess: () => {
                    if (state.modes?.includes('store') && state.modes?.includes('update') && state.close === false) {
                        onSuccess({ keepModes: ['update'] });
                        return;
                    } else if (state.close === false) return;

                    onSuccess({ keepModes: [] });
                }
            },
            update: {
                onSuccess: () => {
                    if (
                        (state.modes?.includes('move') || state.modes?.includes('change')) &&
                        state.modes?.includes('update') &&
                        state.close === false
                    ) {
                        onSuccess({ keepModes: ['update'] });
                        return;
                    }

                    if (state.close === false) return;

                    onSuccess({ keepModes: [] });
                }
            },
            many: {
                onSuccess: (data) => {
                    // Callback global para many, executado após cada atualização de ordenação
                    // Os callbacks individuais são gerenciados em board-update.ts
                    if (typeof window !== 'undefined' && (window as any).__cardManyCallbacks) {
                        const dataArray = Array.isArray(data) ? data : [data];
                        const firstItem = dataArray[0];
                        const cardId = firstItem && 'id' in firstItem ? firstItem.id : null;

                        if (cardId && (window as any).__cardManyCallbacks[cardId]) {
                            // Executa o callback específico do card
                            (window as any).__cardManyCallbacks[cardId].onSuccess(dataArray);
                            // Remove o callback após execução
                            delete (window as any).__cardManyCallbacks[cardId];
                        }
                    }
                },
                onError: () => {
                    // Callback global para many em caso de erro
                    if (typeof window !== 'undefined' && (window as any).__cardManyCallbacks) {
                        // Em caso de erro, executar todos os callbacks pendentes
                        const callbacks = (window as any).__cardManyCallbacks;
                        Object.keys(callbacks).forEach((cardId) => {
                            callbacks[cardId]?.onError?.();
                        });
                        // Limpa todos os callbacks
                        (window as any).__cardManyCallbacks = {};
                    }
                }
            },
            destroy: { onSuccess: () => onSuccess({ keepModes: [] }) },
            restore: { onSuccess: () => onSuccess({ keepModes: [] }) }
        }
    });

    return requests;
};
