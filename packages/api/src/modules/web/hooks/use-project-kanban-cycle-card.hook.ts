import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination, project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { useCache } from "../../../infrastructure/cache";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleCardEndpoint } from "../endpoints/project_kanban_cycle_card";

/**
 * Placeholder para loading state do trash
 */
const trashPlaceholder = {
  data: Array.from({ length: 5 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: "",
    order: i,
  })) as project_kanban_cycle_card[],
  page: 1,
  pages: 1,
  total: 0,
  count: 0,
};

/**
 * Extended props for useProjectKanbanCycleCard hook
 */
export interface UseProjectKanbanCycleCardProps extends UseCallerProps<project_kanban_cycle_card> {
  /** Enable quickIndex query (separate cache for quick search) */
  enabledQuickIndex?: boolean;
  /** Cycle ID for cache updates */
  cycleId?: string;
}

/**
 * Callbacks for card mutations
 */
export interface CardMutationCallbacks {
  onSuccess?: (data: project_kanban_cycle_card | Pagination<project_kanban_cycle_card>) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for card many operation
 */
export interface CardManyCallbacks {
  onSuccess?: (data: project_kanban_cycle_card[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Destroy mutation input
 */
export interface CardDestroyInput {
  id: string;
  query?: {
    delete_cards?: boolean;
    unlink_cards?: boolean;
    card_id?: string;
  };
}

/**
 * Extended return type for useProjectKanbanCycleCard hook
 */
export interface UseProjectKanbanCycleCardReturn {
  index: UseQueryResult<Pagination<project_kanban_cycle_card>, Error>;
  quickIndex: UseQueryResult<Pagination<project_kanban_cycle_card>, Error>;
  show: UseQueryResult<project_kanban_cycle_card, Error>;
  store: UseMutationResult<project_kanban_cycle_card, Error, Partial<project_kanban_cycle_card>>;
  update: UseMutationResult<
    project_kanban_cycle_card,
    Error,
    Partial<project_kanban_cycle_card> & { action?: string }
  >;
  destroy: UseMutationResult<project_kanban_cycle_card, Error, CardDestroyInput>;
  many: UseMutationResult<project_kanban_cycle_card, Error, { id: string; body: Partial<project_kanban_cycle_card> }>;
  trash: UseInfiniteQueryResult<InfiniteData<Pagination<project_kanban_cycle_card>>, Error>;
  restore: UseMutationResult<project_kanban_cycle_card, Error, string | undefined>;
}

/**
 * Hook for Project Kanban Cycle Card operations
 *
 * This hook contains specific Kanban business logic for:
 * - Optimistic cache updates on the cycle board
 * - Card parent/child relationships
 * - Card movement between columns
 * - Special actions (move_cards, delete_cards)
 */
export const useProjectKanbanCycleCard = (
  props: UseProjectKanbanCycleCardProps
): UseProjectKanbanCycleCardReturn => {
  const {
    filters,
    trashFilters,
    id,
    enabledIndex,
    enabledShow,
    enableTrash,
    enabledQuickIndex,
    cycleId,
    callbacks,
  } = props;

  const cache = useCache();

  // Generate cache keys
  const indexKey = cacheKeys.project_kanban_cycle_card.index({
    ...filters,
    quick_search: undefined,
    trash_search: undefined,
  });

  const quickIndexFilters = {
    search: typeof filters?.quick_search === "string" ? filters.quick_search : undefined,
    project_kanban_id: typeof filters?.project_kanban_id === "string" ? filters.project_kanban_id : undefined,
  };

  const quickIndexKey = cacheKeys.project_kanban_cycle_card.quickIndex(quickIndexFilters);
  const showKey = cacheKeys.project_kanban_cycle_card.show(id);
  const trashKey = cacheKeys.project_kanban_cycle_card.trash(trashFilters || filters);
  const projectCycleKey = cacheKeys.project_kanban_cycle.show(cycleId);

  // =============================================================================
  // Queries
  // =============================================================================

  const index = useQuery<Pagination<project_kanban_cycle_card>, Error>({
    queryKey: indexKey,
    queryFn: () =>
      projectKanbanCycleCardEndpoint.index({
        ...filters,
        trash_search: undefined,
        quick_search: undefined,
      }),
    enabled: !!enabledIndex,
  });

  const quickIndex = useQuery<Pagination<project_kanban_cycle_card>, Error>({
    queryKey: quickIndexKey,
    queryFn: () => projectKanbanCycleCardEndpoint.index(quickIndexFilters),
    enabled: !!enabledQuickIndex,
  });

  const show = useQuery<project_kanban_cycle_card, Error>({
    queryKey: showKey,
    queryFn: () => projectKanbanCycleCardEndpoint.show(id!),
    enabled: !!enabledShow && !!id,
  });

  // =============================================================================
  // Mutations
  // =============================================================================

  /**
   * Store mutation - Creates a new card
   *
   * Business logic:
   * 1. Update the stored card's show cache
   * 2. Invalidate index and quickIndex
   * 3. If card has a parent (card_id), update parent's children
   * 4. Update the cycle cache to add card to correct column
   */
  const store = useMutation<project_kanban_cycle_card, Error, Partial<project_kanban_cycle_card>>({
    mutationFn: (body) => projectKanbanCycleCardEndpoint.store(body) as Promise<project_kanban_cycle_card>,
    onSuccess: (card) => {
      try {
        // 1. Update the stored card's show cache
        const storedShowKey = cacheKeys.project_kanban_cycle_card.show(card.id);
        cache.setQueryData(storedShowKey, card);

        // 2. Invalidate index and quickIndex
        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        // 3. If card has a parent, update parent's children
        if (card.card_id) {
          const fatherCardKey = cacheKeys.project_kanban_cycle_card.show(card.card_id);
          cache.setQueryData<project_kanban_cycle_card>(fatherCardKey, (old) => {
            if (!old) return old as unknown as project_kanban_cycle_card;

            return {
              ...old,
              project_kanban_cycle_cards: [...(old?.project_kanban_cycle_cards || []), card],
            };
          });
        }

        // 4. Update cycle cache to add card to correct column
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              if (column.id === card.project_kanban_cycle_column_id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const updatedCards = [card, ...existingCards].sort((a, b) => a.order - b.order);

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
        callbacks?.store?.onSuccess?.(card);
      }
    },
    onError: callbacks?.store?.onError,
  });

  /**
   * Update mutation - Updates a card
   *
   * Business logic:
   * 1. Update the card's show cache
   * 2. Invalidate index and quickIndex
   * 3. Handle special actions: move_cards, delete_cards
   * 4. Update cycle cache:
   *    - If card is in correct column, update it
   *    - If card moved to new column, add to new and remove from old
   *    - Remove from all other columns
   */
  const update = useMutation<
    project_kanban_cycle_card,
    Error,
    Partial<project_kanban_cycle_card> & { action?: string }
  >({
    mutationFn: (body) => projectKanbanCycleCardEndpoint.update(id!, body) as Promise<project_kanban_cycle_card>,
    onSuccess: (card, variables) => {
      const isToMove = variables.action === "move_cards";
      const isDelete = variables.action === "delete_cards";

      try {
        // 1. Update show cache
        cache.setQueryData(showKey, card);

        // 2. Invalidate queries
        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        // 3 & 4. Update cycle cache with special action handling
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              // Handle move_cards or delete_cards actions
              if (isToMove || isDelete) {
                return {
                  ...column,
                  project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                    (c) => c.id !== card.id && c.card_id !== card.id
                  ),
                };
              }

              const columnRef = card.project_kanban_cycle_column_id;

              // If this is the target column
              if (columnRef === column.id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const cardExists = existingCards.some((c) => c.id === card.id);

                if (cardExists) {
                  // Update existing card
                  const updatedCards = existingCards.map((c) => (c.id === card.id ? card : c));
                  return {
                    ...column,
                    project_kanban_cycle_cards: updatedCards,
                  };
                } else {
                  // Card moved to this column - add it
                  const updatedCards = [card, ...existingCards].sort((a, b) => a.order - b.order);
                  return {
                    ...column,
                    project_kanban_cycle_cards: updatedCards,
                  };
                }
              }

              // Remove card from other columns
              return {
                ...column,
                project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                  (c) => c.id !== card.id
                ),
              };
            }),
          };
        });
      } finally {
        callbacks?.update?.onSuccess?.(card);
      }
    },
    onError: callbacks?.update?.onError,
  });

  /**
   * Many mutation - Updates multiple cards (usually for reordering/DND)
   *
   * Business logic:
   * 1. Update cycle cache moving card between columns and reordering
   */
  const many = useMutation<
    project_kanban_cycle_card,
    Error,
    { id: string; body: Partial<project_kanban_cycle_card> }
  >({
    mutationFn: ({ id: cardId, body }) =>
      projectKanbanCycleCardEndpoint.many(cardId, body) as unknown as Promise<project_kanban_cycle_card>,
    onSuccess: (card) => {
      try {
        // Update cycle cache
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              const columnRef = card.project_kanban_cycle_column_id;

              // If not the target column, remove the card
              if (columnRef !== column.id) {
                return {
                  ...column,
                  project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                    (c) => c.id !== card.id
                  ),
                };
              }

              // Target column - add/update the card
              const existingCards =
                column.project_kanban_cycle_cards?.filter((c) => c.id !== card.id) || [];
              const updatedCards = [...existingCards, card].sort((a, b) => a.order - b.order);

              return {
                ...column,
                project_kanban_cycle_cards: updatedCards,
              };
            }),
          };
        });
      } finally {
        callbacks?.many?.onSuccess?.([card]);
      }
    },
    onError: callbacks?.many?.onError,
  });

  /**
   * Destroy mutation - Deletes a card
   *
   * Business logic:
   * 1. Invalidate queries
   * 2. Update cycle cache:
   *    - Remove the card
   *    - Handle delete_cards: also remove children
   *    - Handle card_id transfer: transfer children to new parent
   *    - Handle unlink_cards: remove parent reference from children
   * 3. Update transfer target card cache if needed
   */
  const destroy = useMutation<project_kanban_cycle_card, Error, CardDestroyInput>({
    mutationFn: ({ id: cardId, query }) =>
      projectKanbanCycleCardEndpoint.destroy(cardId, query) as Promise<project_kanban_cycle_card>,
    onSuccess: (card, variables) => {
      try {
        const isDelete = variables.query?.delete_cards;
        const unlinkCards = variables.query?.unlink_cards;
        const transferCardId = variables.query?.card_id;

        // 1. Invalidate queries
        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);
        cache.invalidateQueries(showKey);

        // 2. Update cycle cache
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => ({
              ...column,
              project_kanban_cycle_cards: column.project_kanban_cycle_cards
                // Remove the deleted card
                ?.filter((c) => c.id !== card.id)
                // If delete_cards, also remove children
                ?.filter((c) => !isDelete || c.card_id !== card.id)
                // Handle card_id transfer or unlink
                ?.map((c) => {
                  // Transfer children to new parent
                  if (transferCardId && c.card_id === card.id) {
                    return {
                      ...c,
                      card_id: transferCardId,
                    };
                  }

                  // Unlink children
                  if (unlinkCards && c.card_id === card.id) {
                    return {
                      ...c,
                      card_id: null,
                    };
                  }

                  return c;
                }),
            })),
          };
        });

        // 3. Update transfer target card cache if needed
        if (transferCardId) {
          const transferCardKey = cacheKeys.project_kanban_cycle_card.show(transferCardId);
          cache.setQueryData<project_kanban_cycle_card>(transferCardKey, (old) => {
            if (!old) return old as unknown as project_kanban_cycle_card;
            return {
              ...old,
              project_kanban_cycle_cards: old?.project_kanban_cycle_cards || [],
            };
          });
        }
      } finally {
        callbacks?.destroy?.onSuccess?.(card);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  /**
   * Trash query - Lists deleted cards with infinite pagination
   */
  const trash = useInfiniteQuery<Pagination<project_kanban_cycle_card>, Error>({
    queryKey: trashKey,
    queryFn: ({ pageParam = 1 }) =>
      projectKanbanCycleCardEndpoint.trash!({
        ...(trashFilters || filters),
        project_kanban_cycle_id: undefined,
        page: pageParam as number,
        limit: 15,
        trash_search: undefined,
        quick_search: undefined,
        search: (trashFilters || filters)?.trash_search as string | undefined,
      }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enableTrash,
    placeholderData: () => ({
      pages: [trashPlaceholder],
      page: 1,
      pageParams: [1],
      total: 0,
      limit: 15,
    }),
  });

  /**
   * Restore mutation - Restores a deleted card
   *
   * Business logic:
   * 1. Update restored card's show cache
   * 2. Invalidate queries
   * 3. Update cycle cache to add card back to correct column
   * 4. Refetch trash
   */
  const restore = useMutation<project_kanban_cycle_card, Error, string | undefined>({
    mutationFn: (cardId) =>
      projectKanbanCycleCardEndpoint.restore!(cardId || id!) as Promise<project_kanban_cycle_card>,
    onSuccess: (card) => {
      try {
        // 1. Update show cache
        const restoredShowKey = cacheKeys.project_kanban_cycle_card.show(card.id);
        cache.setQueryData(restoredShowKey, card);

        // 2. Invalidate queries
        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(quickIndexKey);

        // 3. Update cycle cache
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old?.project_kanban_cycle_columns?.map((column) => {
              if (column.id === card.project_kanban_cycle_column_id) {
                const existingCards = column.project_kanban_cycle_cards || [];
                const updatedCards = [card, ...existingCards].sort((a, b) => a.order - b.order);

                return {
                  ...column,
                  project_kanban_cycle_cards: updatedCards,
                };
              }
              return column;
            }),
          };
        });

        // 4. Refetch trash
        cache.refetchQueries(trashKey);
      } finally {
        callbacks?.restore?.onSuccess?.(card);
      }
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    index,
    quickIndex,
    show,
    store,
    update,
    destroy,
    many,
    trash,
    restore,
  };
};
