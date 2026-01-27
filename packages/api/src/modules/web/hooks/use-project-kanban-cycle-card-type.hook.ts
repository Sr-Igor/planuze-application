import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination, project_kanban_cycle, project_kanban_cycle_card_type } from "@repo/types";

import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleCardTypeEndpoint } from "../endpoints/project_kanban_cycle_card_type";

/**
 * Extended props for useProjectKanbanCycleCardType hook
 */
export interface UseProjectKanbanCycleCardTypeProps
  extends Omit<UseCallerProps<project_kanban_cycle_card_type>, "enabledShow"> {
  /** Cycle ID for cache updates */
  cycleId?: string;
}

/**
 * Destroy mutation input with query for card handling
 */
export interface CardTypeDestroyInput {
  id: string;
  query?: {
    /** Delete all cards of this type */
    delete_cards?: boolean;
    /** Transfer cards to this new card type ID */
    project_kanban_cycle_card_type_id?: string;
  };
}

/**
 * Return type for useProjectKanbanCycleCardType hook
 */
export interface UseProjectKanbanCycleCardTypeReturn {
  index: UseQueryResult<Pagination<project_kanban_cycle_card_type>, Error>;
  store: UseMutationResult<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    Partial<project_kanban_cycle_card_type>
  >;
  update: UseMutationResult<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    Partial<project_kanban_cycle_card_type>
  >;
  destroy: UseMutationResult<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    CardTypeDestroyInput
  >;
  trash: UseQueryResult<Pagination<project_kanban_cycle_card_type>, Error>;
  restore: UseMutationResult<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    string
  >;
}

/**
 * Hook for Project Kanban Cycle Card Type operations
 *
 * Matches old-project behavior:
 * - Uses insertInIndex, updateInIndex, destroyInIndex with ordering (createdAt desc, date type)
 * - Updates cycle cache when destroying card types (delete cards or transfer to new type)
 */
export const useProjectKanbanCycleCardType = (
  props: UseProjectKanbanCycleCardTypeProps
): UseProjectKanbanCycleCardTypeReturn => {
  const { filters, trashFilters, id, enabledIndex, enableTrash, cycleId, callbacks } = props;

  const cache = useCache();
  const indexKey = cacheKeys.project_kanban_cycle_card_type.index(filters);
  const trashKey = cacheKeys.project_kanban_cycle_card_type.trash(trashFilters || filters);
  const projectCycleKey = cacheKeys.project_kanban_cycle.show(cycleId);

  const index = useQuery<Pagination<project_kanban_cycle_card_type>, Error>({
    queryKey: indexKey,
    queryFn: () => projectKanbanCycleCardTypeEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const store = useMutation<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    Partial<project_kanban_cycle_card_type>
  >({
    mutationFn: (body) => projectKanbanCycleCardTypeEndpoint.store(body),
    onSuccess: (cardType) => {
      cache.insertInIndex({
        key: indexKey,
        item: cardType,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(cardType);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    Partial<project_kanban_cycle_card_type>
  >({
    mutationFn: (body) => projectKanbanCycleCardTypeEndpoint.update(id!, body),
    onSuccess: (cardType) => {
      cache.updateInIndex({
        key: indexKey,
        item: cardType,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(cardType);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    CardTypeDestroyInput
  >({
    mutationFn: ({ id: cardTypeId, query: destroyQuery }) =>
      projectKanbanCycleCardTypeEndpoint.destroy(cardTypeId, destroyQuery as any),
    onSuccess: (cardType, variables) => {
      try {
        const cardTypeId = variables.id;
        const isDelete = variables.query?.delete_cards;
        const newCardTypeId = variables.query?.project_kanban_cycle_card_type_id;

        // Update cycle cache if cycleId is provided
        if (projectCycleKey) {
          cache.setQueryData<project_kanban_cycle>(
            projectCycleKey,
            (old: project_kanban_cycle | undefined) => {
              if (!old) return old;

              return {
                ...old,
                project_kanban_cycle_columns: old.project_kanban_cycle_columns?.map((column) => {
                  if (isDelete) {
                    // Delete all cards of this type
                    return {
                      ...column,
                      project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                        (card) => card.project_kanban_cycle_card_type_id !== cardTypeId
                      ),
                    };
                  } else if (newCardTypeId) {
                    // Transfer cards to new type
                    return {
                      ...column,
                      project_kanban_cycle_cards: column.project_kanban_cycle_cards?.map((card) => {
                        if (card.project_kanban_cycle_card_type_id === cardTypeId) {
                          return {
                            ...card,
                            project_kanban_cycle_card_type_id: newCardTypeId,
                          };
                        }
                        return card;
                      }),
                    };
                  }
                  return column;
                }),
              };
            }
          );
        }

        // Update index and trash caches
        cache.destroyInIndex({
          key: indexKey,
          item: cardType,
          orderKey: "createdAt",
          orderValue: "desc",
          dataType: "date",
          refetch: false,
        });
        cache.insertInIndex({
          key: trashKey,
          item: cardType,
          orderKey: "createdAt",
          orderValue: "desc",
          dataType: "date",
          refetch: false,
        });
      } finally {
        callbacks?.destroy?.onSuccess?.(cardType);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useQuery<Pagination<project_kanban_cycle_card_type>, Error>({
    queryKey: trashKey,
    queryFn: () => projectKanbanCycleCardTypeEndpoint.trash(trashFilters || filters),
    enabled: !!enableTrash,
  });

  const restore = useMutation<
    project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
    Error,
    string
  >({
    mutationFn: (cardTypeId) => projectKanbanCycleCardTypeEndpoint.restore(cardTypeId),
    onSuccess: (cardType) => {
      cache.destroyInIndex({
        key: trashKey,
        item: cardType,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      cache.insertInIndex({
        key: indexKey,
        item: cardType,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.restore?.onSuccess?.(cardType);
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, destroy, trash, restore, update, index };
};
