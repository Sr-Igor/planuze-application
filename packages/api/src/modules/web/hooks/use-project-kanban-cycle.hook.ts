import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination, project_kanban, project_kanban_cycle } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { useCache } from "../../../infrastructure/cache";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleEndpoint } from "../endpoints/project_kanban_cycle";

/**
 * Extended props for useProjectKanbanCycle hook
 */
export interface UseProjectKanbanCycleProps
  extends Omit<UseCallerProps<project_kanban_cycle>, "enabledIndex"> {}

/**
 * Update mutation input
 */
export interface CycleUpdateInput {
  id: string;
  body: Partial<project_kanban_cycle>;
}

/**
 * Destroy mutation input
 */
export interface CycleDestroyInput {
  id: string;
  query?: {
    /** Cycle ID to move items when deleting */
    project_kanban_cycle_id?: string;
  };
}

/**
 * Return type for useProjectKanbanCycle hook
 */
export interface UseProjectKanbanCycleReturn {
  show: UseQueryResult<project_kanban_cycle, Error>;
  store: UseMutationResult<project_kanban_cycle, Error, Partial<project_kanban_cycle>>;
  update: UseMutationResult<project_kanban_cycle, Error, CycleUpdateInput>;
  destroy: UseMutationResult<project_kanban_cycle, Error, CycleDestroyInput>;
  many: UseMutationResult<
    project_kanban_cycle[],
    Error,
    { ids: string; body: { data: Partial<project_kanban_cycle>[] } }
  >;
  trash: UseQueryResult<Pagination<project_kanban_cycle>, Error>;
  restore: UseMutationResult<project_kanban_cycle, Error, { id: string }>;
}

/**
 * Hook for Project Kanban Cycle operations
 *
 * This hook contains specific Kanban business logic for:
 * - Optimistic cache updates on the kanban
 * - Cycle ordering
 * - Refetching card types after cycle creation
 */
export const useProjectKanbanCycle = (
  props: UseProjectKanbanCycleProps
): UseProjectKanbanCycleReturn => {
  const { filters, trashFilters, id, enabledShow, enableTrash, callbacks } = props;

  const cache = useCache();

  // Generate cache keys
  const indexCardTypesKey = cacheKeys.project_kanban_cycle_card_type.index({});
  const projectKanbanKey = cacheKeys.project_kanban.show(filters?.project_kanban_id);
  const showKey = cacheKeys.project_kanban_cycle.show(id);
  const trashKey = cacheKeys.project_kanban_cycle.trash(trashFilters || filters);

  // =============================================================================
  // Queries
  // =============================================================================

  const show = useQuery<project_kanban_cycle, Error>({
    queryKey: showKey,
    queryFn: () => projectKanbanCycleEndpoint.show(id!),
    enabled: !!enabledShow && !!id,
  });

  // =============================================================================
  // Mutations
  // =============================================================================

  /**
   * Store mutation - Creates a new cycle
   *
   * Business logic:
   * 1. Update kanban cache: add cycle to cycles list
   * 2. Refetch card types (new cycle may have new card types)
   */
  const store = useMutation<project_kanban_cycle, Error, Partial<project_kanban_cycle>>({
    mutationFn: (body) =>
      projectKanbanCycleEndpoint.store(body) as Promise<project_kanban_cycle>,
    onSuccess: (cycle) => {
      try {
        // 1. Update kanban cache
        cache.setQueryData<project_kanban>(projectKanbanKey, (old) => {
          if (!old) return old as unknown as project_kanban;

          return {
            ...old,
            project_kanban_cycles: [cycle, ...(old.project_kanban_cycles || [])],
          };
        });

        // 2. Refetch card types
        cache.refetchQueries(indexCardTypesKey);
      } finally {
        callbacks?.store?.onSuccess?.(cycle);
      }
    },
    onError: callbacks?.store?.onError,
  });

  /**
   * Update mutation - Updates a cycle
   *
   * Business logic:
   * 1. Update kanban cache: update cycle in cycles list
   */
  const update = useMutation<project_kanban_cycle, Error, CycleUpdateInput>({
    mutationFn: ({ id: cycleId, body }) =>
      projectKanbanCycleEndpoint.update(cycleId, body) as Promise<project_kanban_cycle>,
    onSuccess: (cycle) => {
      try {
        // Update kanban cache
        cache.setQueryData<project_kanban>(projectKanbanKey, (old) => {
          if (!old) return old as unknown as project_kanban;

          return {
            ...old,
            project_kanban_cycles: old.project_kanban_cycles?.map((c) =>
              c.id === cycle.id ? cycle : c
            ),
          };
        });
      } finally {
        callbacks?.update?.onSuccess?.(cycle);
      }
    },
    onError: callbacks?.update?.onError,
  });

  /**
   * Many mutation - Updates multiple cycles (for reordering)
   *
   * Business logic:
   * 1. Update kanban cache: merge updated cycles with existing data and sort
   */
  const many = useMutation<
    project_kanban_cycle[],
    Error,
    { ids: string; body: { data: Partial<project_kanban_cycle>[] } }
  >({
    mutationFn: ({ ids, body }) =>
      projectKanbanCycleEndpoint.many(ids, body) as Promise<project_kanban_cycle[]>,
    onSuccess: (cycles) => {
      try {
        // Update kanban cache preserving existing data
        cache.setQueryData<project_kanban>(projectKanbanKey, (old) => {
          if (!old) return old as unknown as project_kanban;

          const newCycles = cycles.map((cycle) => {
            const oldCycle = old.project_kanban_cycles?.find((c) => c.id === cycle.id);

            return {
              ...oldCycle,
              ...cycle,
            };
          });

          return {
            ...old,
            project_kanban_cycles: newCycles?.sort((a, b) => b.order - a.order),
          };
        });
      } finally {
        callbacks?.many?.onSuccess?.(cycles);
      }
    },
    onError: callbacks?.many?.onError,
  });

  /**
   * Destroy mutation - Deletes a cycle
   *
   * Business logic:
   * 1. If there's a target cycle, invalidate its show cache
   * 2. Update kanban cache: remove cycle from list
   * 3. Update trash cache: add deleted cycle
   */
  const destroy = useMutation<project_kanban_cycle, Error, CycleDestroyInput>({
    mutationFn: ({ id: cycleId, query }) =>
      projectKanbanCycleEndpoint.destroy(cycleId, query) as Promise<project_kanban_cycle>,
    onSuccess: (cycle, variables) => {
      try {
        // 1. If target cycle exists, invalidate its cache
        const targetCycleId = variables.query?.project_kanban_cycle_id;
        if (targetCycleId) {
          const showCycleKey = cacheKeys.project_kanban_cycle.show(targetCycleId);
          cache.invalidateShow(showCycleKey);
        }

        // 2. Update kanban cache
        cache.setQueryData<project_kanban>(projectKanbanKey, (old) => {
          if (!old) return old as unknown as project_kanban;

          return {
            ...old,
            project_kanban_cycles: old.project_kanban_cycles?.filter((c) => c.id !== cycle.id),
          };
        });

        // 3. Update trash cache
        cache.setQueryData<Pagination<project_kanban_cycle>>(trashKey, (old) => {
          return {
            ...old,
            data: [cycle, ...(old?.data || [])],
          } as Pagination<project_kanban_cycle>;
        });
      } finally {
        callbacks?.destroy?.onSuccess?.(cycle);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  /**
   * Trash query - Lists deleted cycles
   */
  const trash = useQuery<Pagination<project_kanban_cycle>, Error>({
    queryKey: trashKey,
    queryFn: () => projectKanbanCycleEndpoint.trash!(trashFilters || filters),
    enabled: !!enableTrash,
  });

  /**
   * Restore mutation - Restores a deleted cycle
   *
   * Business logic:
   * 1. Update trash cache: remove restored cycle
   * 2. Update kanban cache: add cycle back to list
   */
  const restore = useMutation<project_kanban_cycle, Error, { id: string }>({
    mutationFn: ({ id: cycleId }) =>
      projectKanbanCycleEndpoint.restore!(cycleId) as Promise<project_kanban_cycle>,
    onSuccess: (cycle) => {
      try {
        // 1. Update trash cache
        cache.setQueryData<Pagination<project_kanban_cycle>>(trashKey, (old) => {
          return {
            ...old,
            data: old?.data?.filter((item) => item.id !== cycle.id),
          } as Pagination<project_kanban_cycle>;
        });

        // 2. Update kanban cache
        cache.setQueryData<project_kanban>(projectKanbanKey, (old) => {
          if (!old) return old as unknown as project_kanban;

          return {
            ...old,
            project_kanban_cycles: [cycle, ...(old?.project_kanban_cycles || [])],
          };
        });
      } finally {
        callbacks?.restore?.onSuccess?.(cycle);
      }
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    show,
    store,
    update,
    destroy,
    many,
    trash,
    restore,
  };
};
