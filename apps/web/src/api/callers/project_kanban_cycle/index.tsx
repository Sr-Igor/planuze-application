import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { project_kanban, project_kanban_cycle } from '@/api/generator/types';
import * as api from '@/api/req/project_kanban_cycle';
import { IUseCallerProps } from '@/api/types';
import { Pagination } from '@/types/pagination';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProjectKanbanCycle = ({
    callbacks,
    filters,
    trashFilters,
    enabledShow,
    id,
    enableTrash
}: IUseCallerProps<project_kanban_cycle>) => {
    const indexCardTypesKey = keys.project_kanban_cycle_card_type.index({});
    const projectKanbanKey = keys.project_kanban.show(filters?.project_kanban_id);
    const showKey = keys.project_kanban_cycle.show(id);
    const trashKey = keys.project_kanban_cycle.trash(trashFilters || filters);
    const cache = useCache();

    const show = useQuery<project_kanban_cycle>({
        queryKey: showKey,
        queryFn: () => api.show(id!),
        enabled: !!enabledShow
    });

    const store = useMutation({
        mutationFn: (body: any) => api.store(body),
        onSuccess: (e) => {
            try {
                cache.setQueryData(projectKanbanKey, (old: project_kanban) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycles: [e, ...(old.project_kanban_cycles || [])]
                    };
                });
                cache.refetchQueries(indexCardTypesKey);
            } finally {
                callbacks?.store?.onSuccess?.(e);
            }
        },
        onError: callbacks?.store?.onError
    });

    const update = useMutation({
        mutationFn: (data: { id: string; body: any }) => api.update(data.id, data.body),
        onSuccess: (e) => {
            try {
                cache.setQueryData(projectKanbanKey, (old: project_kanban) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycles: old.project_kanban_cycles?.map((cycle) =>
                            cycle.id === e.id ? e : cycle
                        )
                    };
                });
            } finally {
                callbacks?.update?.onSuccess?.(e);
            }
        },
        onError: callbacks?.update?.onError
    });

    const many = useMutation({
        mutationFn: ({ ids, body }: any) => api.many(ids, body),
        onSuccess: (e: project_kanban_cycle[]) => {
            try {
                cache.setQueryData(projectKanbanKey, (old: project_kanban) => {
                    if (!old) return old;

                    const newCycles = e.map((cycle) => {
                        const oldCycle = old.project_kanban_cycles?.find((c) => c.id === cycle.id);

                        return {
                            ...oldCycle,
                            ...cycle
                        };
                    });

                    return {
                        ...old,
                        project_kanban_cycles: newCycles?.sort((a, b) => b.order - a.order)
                    };
                });
            } finally {
                callbacks?.many?.onSuccess?.(e);
            }
        },
        onError: callbacks?.many?.onError
    });

    const destroy = useMutation({
        mutationFn: (data: { id: string; query: any }) => api.destroy(data.id, data.query),
        onSuccess: (e, variables) => {
            const cycleKey = variables.query.project_kanban_cycle_id;
            if (cycleKey) {
                const showCycleKey = keys.project_kanban_cycle.show(cycleKey);
                cache.invalidateShow(showCycleKey);
            }

            try {
                cache.setQueryData(projectKanbanKey, (old: project_kanban) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycles: old.project_kanban_cycles?.filter((cycle) => cycle.id !== e.id)
                    };
                });
                cache.setQueryData(trashKey, (old: Pagination<project_kanban_cycle>) => {
                    return {
                        ...old,
                        data: [e, ...(old?.data || [])]
                    };
                });
            } finally {
                callbacks?.destroy?.onSuccess?.(e);
            }
        },
        onError: callbacks?.destroy?.onError
    });

    const trash = useQuery<Pagination<project_kanban_cycle>>({
        queryKey: trashKey,
        queryFn: () => api.trash(trashFilters || filters),
        enabled: !!enableTrash
    });

    const restore = useMutation({
        mutationFn: (data: { id: string }) => api.restore(data.id),
        onSuccess: (e) => {
            try {
                cache.setQueryData(trashKey, (old: Pagination<project_kanban_cycle>) => {
                    return {
                        ...old,
                        data: old.data?.filter((item) => item.id !== e.id)
                    };
                });
                cache.setQueryData(projectKanbanKey, (old: project_kanban) => {
                    if (!old) return old;

                    return {
                        ...old,
                        project_kanban_cycles: [e, ...(old?.project_kanban_cycles || [])]
                    };
                });
            } finally {
                callbacks?.restore?.onSuccess?.(e);
            }
        },
        onError: callbacks?.restore?.onError
    });

    return { store, destroy, show, trash, restore, update, many };
};
