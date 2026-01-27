import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination, project_kanban_cycle_allocation } from "@repo/types";

import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleAllocationEndpoint } from "../endpoints/project_kanban_cycle_allocation";

/**
 * Return type for useProjectKanbanCycleAllocation hook
 */
export interface UseProjectKanbanCycleAllocationReturn {
  index: UseQueryResult<Pagination<project_kanban_cycle_allocation>, Error>;
  store: UseMutationResult<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    Partial<project_kanban_cycle_allocation>
  >;
  update: UseMutationResult<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    | Partial<project_kanban_cycle_allocation>
    | { id: string; body: Partial<project_kanban_cycle_allocation> }
  >;
  destroy: UseMutationResult<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    void | { id: string; query?: any }
  >;
  trash: UseQueryResult<Pagination<project_kanban_cycle_allocation>, Error>;
  restore: UseMutationResult<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    string | undefined
  >;
}

/**
 * Hook for Project Kanban Cycle Allocation operations
 *
 * Matches old-project behavior: uses insertInIndex, updateInIndex, destroyInIndex
 * with specific ordering (createdAt desc, date type)
 */
export const useProjectKanbanCycleAllocation = (
  props: UseCallerProps<project_kanban_cycle_allocation>
): UseProjectKanbanCycleAllocationReturn => {
  const { filters, trashFilters, id, enabledIndex, enableTrash, callbacks } = props;

  const cache = useCache();
  const indexKey = cacheKeys.project_kanban_cycle_allocation.index(filters);
  const trashKey = cacheKeys.project_kanban_cycle_allocation.trash(trashFilters || filters);

  const index = useQuery<Pagination<project_kanban_cycle_allocation>, Error>({
    queryKey: indexKey,
    queryFn: () => projectKanbanCycleAllocationEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const store = useMutation<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    Partial<project_kanban_cycle_allocation>
  >({
    mutationFn: (body) => projectKanbanCycleAllocationEndpoint.store(body),
    onSuccess: (allocation) => {
      cache.insertInIndex({
        key: indexKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(allocation);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    | Partial<project_kanban_cycle_allocation>
    | { id: string; body: Partial<project_kanban_cycle_allocation> }
  >({
    mutationFn: (variables) => {
      let updateId = id;
      let body: Partial<project_kanban_cycle_allocation> = variables as any;

      if ("id" in variables && "body" in variables) {
        updateId = (variables as any).id;
        body = (variables as any).body;
      }

      return projectKanbanCycleAllocationEndpoint.update(updateId!, body);
    },
    onSuccess: (allocation) => {
      cache.updateInIndex({
        key: indexKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(allocation);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    void | { id: string; query?: any }
  >({
    mutationFn: (variables) => {
      const destroyId = (variables && (variables as any).id) || id;
      const query = variables && (variables as any).query;
      return projectKanbanCycleAllocationEndpoint.destroy(destroyId!, query);
    },
    onSuccess: (allocation) => {
      cache.destroyInIndex({
        key: indexKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      cache.insertInIndex({
        key: trashKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.destroy?.onSuccess?.(allocation);
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useQuery<Pagination<project_kanban_cycle_allocation>, Error>({
    queryKey: trashKey,
    queryFn: () => projectKanbanCycleAllocationEndpoint.trash(trashFilters || filters),
    enabled: !!enableTrash,
  });

  const restore = useMutation<
    project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
    Error,
    string | undefined
  >({
    mutationFn: (allocationId) => projectKanbanCycleAllocationEndpoint.restore(allocationId || id!),
    onSuccess: (allocation) => {
      cache.destroyInIndex({
        key: trashKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      cache.insertInIndex({
        key: indexKey,
        item: allocation,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.restore?.onSuccess?.(allocation);
    },
    onError: callbacks?.restore?.onError,
  });

  return { index, store, update, destroy, trash, restore };
};
