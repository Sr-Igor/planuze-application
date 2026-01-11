import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { project_kanban_cycle_card, project_kanban_cycle_card_read } from '@/api/generator/types';
import * as api from '@/api/req/project_kanban_cycle_card_read';
import { IUseCallerProps } from '@/api/types';
import { useMutation } from '@tanstack/react-query';

export const useProjectKanbanCycleCardRead = ({
    callbacks,
    cardId
}: IUseCallerProps<project_kanban_cycle_card_read> & { cardId?: string }) => {
    const showKey = keys.project_kanban_cycle_card.show(cardId);

    const cache = useCache();

    const store = useMutation({
        mutationFn: (body: any) => api.store(body),
        onSuccess: (e) => {
            try {
                cache.setQueryData(showKey, (old: project_kanban_cycle_card) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycle_card_reads: [e, ...(old.project_kanban_cycle_card_reads || [])]
                    };
                });
            } finally {
                callbacks?.store?.onSuccess?.(e);
            }
        },
        onError: callbacks?.store?.onError
    });

    return { store };
};
