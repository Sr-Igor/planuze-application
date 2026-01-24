import * as api from "#/web/req/project_kanban_cycle_card";
import { useCache } from "#/cache";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { Pagination } from "../../../@types";
import { placeholder } from "./placeholder";

export const useProjectKanbanCycleCard = ({
  callbacks,
  filters,
  trashFilters,
  id,
  enabledShow,
  enableTrash,
  enabledIndex,
  enabledQuickIndex,
  cycleId,
}: IUseCallerProps<project_kanban_cycle_card> & {
  enabledQuickIndex?: boolean;
  cycleId?: string;
}) => {
  const indexKey = keys.project_kanban_cycle_card.index({
    ...filters,
    quick_search: undefined,
    trash_search: undefined,
  });

  const quickIndexFilters = {
    search: filters?.quick_search || undefined,
    project_kanban_id: filters?.project_kanban_id || undefined,
  };

  const quickIndexKey = keys.project_kanban_cycle_card.quickIndex(quickIndexFilters);

  const showKey = keys.project_kanban_cycle_card.show(id);
  const trashKey = keys.project_kanban_cycle_card.trash(trashFilters || filters);
  const projectCycleKey = keys.project_kanban_cycle.show(cycleId);

  const cache = useCache();

  const index = useQuery<Pagination<project_kanban_cycle_card>>({
    queryKey: indexKey,
    queryFn: () =>
      api.index({
        ...filters,
        trash_search: undefined,
        quick_search: undefined,
      }),
    enabled: !!enabledIndex,
  });

  const quickIndex = useQuery<Pagination<project_kanban_cycle_card>>({
    queryKey: quickIndexKey,
    queryFn: () => api.index(quickIndexFilters),
    enabled: !!enabledQuickIndex,
  });

  const show = useQuery<project_kanban_cycle_card>({
    queryKey: showKey,
    queryFn: () => api.show(id!),
    enabled: !!enabledShow,
  });

  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: (e) => {
      try {
        const storedShowKey = keys.project_kanban_cycle_card.show(e.id);
        cache.setQueryData(storedShowKey, e);

        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        if (e.card_id) {
          const fatherCardKey = keys.project_kanban_cycle_card.show(e.card_id);
          cache.setQueryData(fatherCardKey, (old: project_kanban_cycle_card) => {
            if (!old) return old;

            return {
              ...old,
              project_kanban_cycle_cards: [...(old?.project_kanban_cycle_cards || []), e],
            };
          });
        }

        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              if (column.id === e.project_kanban_cycle_column_id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const updatedCards = [e, ...existingCards].sort((a, b) => a.order - b.order);

                return {
                  ...column,
                  project_kanban_cycle_cards: updatedCards,
                };
              }
              return column;
            }),
          };
        });
      } finally {
        callbacks?.store?.onSuccess?.(e);
      }
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: any) => api.update(id!, body),
    onSuccess: (e, variables) => {
      const isToMove = variables.action === "move_cards";
      const isDelete = variables.action === "delete_cards";

      try {
        cache.setQueryData(showKey, e);

        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              if (isToMove || isDelete) {
                return {
                  ...column,
                  project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                    (card) => card.id !== e.id && card.card_id !== e.id
                  ),
                };
              }

              const columnRef = e.project_kanban_cycle_column_id;

              if (columnRef === column.id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const cardExists = existingCards.some((card) => card.id === e.id);

                if (cardExists) {
                  const updatedCards = existingCards.map((card) => (card.id === e.id ? e : card));
                  return {
                    ...column,
                    project_kanban_cycle_cards: updatedCards,
                  };
                } else {
                  const updatedCards = [e, ...existingCards].sort((a, b) => a.order - b.order);
                  return {
                    ...column,
                    project_kanban_cycle_cards: updatedCards,
                  };
                }
              }

              return {
                ...column,
                project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                  (card) => card.id !== e.id
                ),
              };
            }),
          };
        });
      } finally {
        callbacks?.update?.onSuccess?.(e);
      }
    },
    onError: callbacks?.update?.onError,
  });

  const many = useMutation({
    mutationFn: ({ id, body }: any) => api.many(id, body),
    onSuccess: (e: project_kanban_cycle_card) => {
      try {
        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              const columnRef = e.project_kanban_cycle_column_id;

              if (columnRef !== column.id)
                return {
                  ...column,
                  project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                    (card) => card.id !== e.id
                  ),
                };

              const existingCards =
                column.project_kanban_cycle_cards?.filter((card) => card.id !== e.id) || [];

              const updatedCards = [...existingCards, e].sort((a, b) => a.order - b.order);

              return {
                ...column,
                project_kanban_cycle_cards: updatedCards,
              };
            }),
          };
        });
      } finally {
        callbacks?.many?.onSuccess?.([e]);
      }
    },
    onError: callbacks?.many?.onError,
  });

  const destroy = useMutation({
    mutationFn: (data: { id: string; query: any }) => api.destroy(data.id, data.query),
    onSuccess: (e, variables) => {
      try {
        const isDelete = variables.query.delete_cards;
        const unlinkCards = variables.query.unlink_cards;
        const transferCardId = variables.query.card_id;

        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);
        cache.invalidateQueries(showKey);

        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => ({
              ...column,
              project_kanban_cycle_cards: column.project_kanban_cycle_cards
                ?.filter((card) => card.id !== e.id)
                ?.filter((card) => !isDelete || card.card_id !== e.id)
                ?.map((card) => {
                  if (transferCardId && card.card_id === e.id && transferCardId) {
                    return {
                      ...card,
                      card_id: transferCardId,
                    };
                  }

                  if (unlinkCards && card.card_id === e.id) {
                    return {
                      ...card,
                      card_id: null,
                    };
                  }

                  return card;
                }),
            })),
          };
        });

        if (transferCardId) {
          const transferCardKey = keys.project_kanban_cycle_card.show(transferCardId);
          cache.setQueryData(transferCardKey, (old: project_kanban_cycle_card) => {
            if (!old) return old;

            const transferredCards = old?.project_kanban_cycle_cards || [];

            return {
              ...old,
              project_kanban_cycle_cards: transferredCards,
            };
          });
        }
      } finally {
        callbacks?.destroy?.onSuccess?.(e);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useInfiniteQuery<Pagination<project_kanban_cycle_card>>({
    queryKey: trashKey,
    queryFn: ({ pageParam = 1 }) =>
      api.trash({
        ...(trashFilters || filters),
        project_kanban_cycle_id: undefined,
        page: pageParam,
        limit: 15,
        trash_search: undefined,
        quick_search: undefined,
        search: (trashFilters || filters)?.trash_search,
      }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enableTrash,
    placeholderData: () => ({
      pages: [
        {
          data: placeholder,
          page: 1,
          pages: 1,
          total: 0,
          count: 0,
        },
      ],
      page: 1,
      pageParams: [1],
      total: 0,
      limit: 15,
    }),
  });

  const restore = useMutation({
    mutationFn: (body: any) => api.restore(id!, body),
    onSuccess: (e) => {
      try {
        const restoredShowKey = keys.project_kanban_cycle_card.show(e.id);
        cache.setQueryData(restoredShowKey, e);

        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              if (column.id === e.project_kanban_cycle_column_id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const updatedCards = [e, ...existingCards].sort((a, b) => a.order - b.order);

                return {
                  ...column,
                  project_kanban_cycle_cards: updatedCards,
                };
              }
              return column;
            }),
          };
        });

        cache.refetchQueries(trashKey);
      } finally {
        callbacks?.restore?.onSuccess?.(e);
      }
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, destroy, trash, restore, update, many, index, quickIndex, show };
};
