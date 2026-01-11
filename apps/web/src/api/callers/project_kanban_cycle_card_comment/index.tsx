import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { project_kanban_cycle_card, project_kanban_cycle_card_comment } from '@/api/generator/types';
import * as api from '@/api/req/project_kanban_cycle_card_comment';
import { IUseCallerProps } from '@/api/types';
import { useMutation } from '@tanstack/react-query';

export const useProjectKanbanCycleCardComment = ({
    callbacks,
    id,
    cardId
}: IUseCallerProps<project_kanban_cycle_card_comment> & { cardId?: string }) => {
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
                        project_kanban_cycle_card_comments: [e, ...(old.project_kanban_cycle_card_comments || [])]
                    };
                });
            } finally {
                callbacks?.store?.onSuccess?.(e);
            }
        },
        onError: callbacks?.store?.onError
    });

    const update = useMutation({
        mutationFn: (body: any) => api.update(id!, body),
        onSuccess: (e) => {
            try {
                cache.setQueryData(showKey, (old: project_kanban_cycle_card) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycle_card_comments: old.project_kanban_cycle_card_comments?.map((comment) =>
                            comment.id === e.id ? e : comment
                        )
                    };
                });
            } finally {
                callbacks?.update?.onSuccess?.(e);
            }
        },
        onError: callbacks?.update?.onError
    });

    const destroy = useMutation({
        mutationFn: () => api.destroy(id!),
        onSuccess: (e) => {
            try {
                cache.setQueryData(showKey, (old: project_kanban_cycle_card) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycle_card_comments: old.project_kanban_cycle_card_comments?.filter(
                            (comment) => comment.id !== e.id
                        )
                    };
                });
            } finally {
                callbacks?.destroy?.onSuccess?.(e);
            }
        },
        onError: callbacks?.destroy?.onError
    });

    return { store, destroy, update };
};
