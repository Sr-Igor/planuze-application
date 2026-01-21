import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

import type {
  Pagination,
  project_kanban,
  project_kanban_cycle,
  project_kanban_cycle_column,
} from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { useCache } from "../../../infrastructure/cache";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleColumnEndpoint } from "../endpoints/project_kanban_cycle_column";

/**
 * Extended props for useProjectKanbanCycleColumn hook
 */
export interface UseProjectKanbanCycleColumnProps
  extends Omit<UseCallerProps<project_kanban_cycle_column>, "enabledIndex" | "enabledShow"> {}

/**
 * Destroy mutation input with query for moving cards
 */
export interface ColumnDestroyInput {
  id: string;
  query?: {
    /** Target column ID to move cards when deleting */
    project_kanban_cycle_column_id?: string;
  };
}

/**
 * Update mutation input
 */
export interface ColumnUpdateInput {
  id?: string;
  body: Partial<project_kanban_cycle_column>;
}

/**
 * Return type for useProjectKanbanCycleColumn hook
 */
export interface UseProjectKanbanCycleColumnReturn {
  store: UseMutationResult<project_kanban_cycle_column, Error, Partial<project_kanban_cycle_column>>;
  update: UseMutationResult<project_kanban_cycle_column, Error, ColumnUpdateInput>;
  destroy: UseMutationResult<project_kanban_cycle_column, Error, ColumnDestroyInput>;
  many: UseMutationResult<
    project_kanban_cycle_column[],
    Error,
    { ids: string; body: { data: Partial<project_kanban_cycle_column>[] } }
  >;
  trash: UseQueryResult<Pagination<project_kanban_cycle_column>, Error>;
  restore: UseMutationResult<project_kanban_cycle_column, Error, string>;
}

/**
 * Hook for Project Kanban Cycle Column operations
 *
 * This hook contains specific Kanban business logic for:
 * - Optimistic cache updates on the kanban and cycle
 * - Moving cards to another column when deleting
 * - Preserving cards when reordering columns (many)
 */
export const useProjectKanbanCycleColumn = (
  props: UseProjectKanbanCycleColumnProps
): UseProjectKanbanCycleColumnReturn => {
  const { filters, trashFilters, id, enableTrash, callbacks } = props;

  const cache = useCache();

  // Generate cache keys
  const trashKey = cacheKeys.project_kanban_cycle_column.trash(trashFilters || filters);
  const projectKanbanKey = cacheKeys.project_kanban.show(filters?.project_kanban_id);
  const projectCycleKey = cacheKeys.project_kanban_cycle.show(filters?.project_kanban_cycle_id);

  // =============================================================================
  // Mutations
  // =============================================================================

  /**
   * Store mutation - Creates a new column
   *
   * Business logic:
   * 1. Update kanban cache: add column to the correct cycle
   * 2. Update cycle cache: add column with ordering
   */
  const store = useMutation<
    project_kanban_cycle_column,
    Error,
    Partial<project_kanban_cycle_column>
  >({
    mutationFn: (body) =>
      projectKanbanCycleColumnEndpoint.store(body) as Promise<project_kanban_cycle_column>,
    onSuccess: (column) => {
      try {
        // 1. Update kanban cache
        cache.setQueriesData<project_kanban>(projectKanbanKey, (oldData) => {
          if (!oldData) return oldData as unknown as project_kanban;

          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === column.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: [
                      column,
                      ...(cycle.project_kanban_cycle_columns || []),
                    ].sort((a, b) => b.order - a.order),
                  }
                : cycle
            ),
          };
        });

        // 2. Update cycle cache
        cache.insertInNestedArray({
          key: projectCycleKey,
          field: "project_kanban_cycle_columns",
          item: column,
          orderKey: "order",
          orderValue: "asc",
          dataType: "number",
          refetch: false,
        });
      } finally {
        callbacks?.store?.onSuccess?.(column);
      }
    },
    onError: callbacks?.store?.onError,
  });

  /**
   * Update mutation - Updates a column
   *
   * Business logic:
   * 1. Update kanban cache: update column in the correct cycle
   * 2. Update cycle cache: update column with ordering
   */
  const update = useMutation<project_kanban_cycle_column, Error, ColumnUpdateInput>({
    mutationFn: ({ id: columnId, body }) =>
      projectKanbanCycleColumnEndpoint.update(
        columnId || id!,
        body
      ) as Promise<project_kanban_cycle_column>,
    onSuccess: (column) => {
      try {
        // 1. Update kanban cache
        cache.setQueriesData<project_kanban>(projectKanbanKey, (oldData) => {
          if (!oldData) return oldData as unknown as project_kanban;

          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === column.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: cycle.project_kanban_cycle_columns
                      ?.map((col) => (col.id === column.id ? column : col))
                      .sort((a, b) => b.order - a.order),
                  }
                : cycle
            ),
          };
        });

        // 2. Update cycle cache
        cache.updateInNestedArray({
          key: projectCycleKey,
          field: "project_kanban_cycle_columns",
          item: column,
          orderKey: "order",
          orderValue: "asc",
          dataType: "number",
          refetch: false,
        });
      } finally {
        callbacks?.update?.onSuccess?.(column);
      }
    },
    onError: callbacks?.update?.onError,
  });

  /**
   * Many mutation - Updates multiple columns (for reordering)
   *
   * Business logic:
   * 1. Update cycle cache preserving cards in each column
   */
  const many = useMutation<
    project_kanban_cycle_column[],
    Error,
    { ids: string; body: { data: Partial<project_kanban_cycle_column>[] } }
  >({
    mutationFn: ({ ids, body }) =>
      projectKanbanCycleColumnEndpoint.many(ids, body) as Promise<project_kanban_cycle_column[]>,
    onSuccess: (columns) => {
      try {
        // Update cycle cache preserving cards
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          return {
            ...old,
            project_kanban_cycle_columns: old.project_kanban_cycle_columns?.map((column) => {
              const newItem = columns.find((item) => item.id === column.id);

              return {
                ...newItem,
                // CRITICAL: Preserve existing cards
                project_kanban_cycle_cards: column.project_kanban_cycle_cards,
              } as project_kanban_cycle_column;
            }),
          };
        });
      } finally {
        callbacks?.many?.onSuccess?.(columns);
      }
    },
    onError: callbacks?.many?.onError,
  });

  /**
   * Destroy mutation - Deletes a column
   *
   * Business logic:
   * 1. Update kanban cache: remove column from cycle
   * 2. Update cycle cache:
   *    - If target column specified, move all cards to target column
   *    - Remove the deleted column
   */
  const destroy = useMutation<project_kanban_cycle_column, Error, ColumnDestroyInput>({
    mutationFn: ({ id: columnId, query }) =>
      projectKanbanCycleColumnEndpoint.destroy(
        columnId,
        query
      ) as Promise<project_kanban_cycle_column>,
    onSuccess: (column, variables) => {
      try {
        // 1. Update kanban cache
        cache.setQueriesData<project_kanban>(projectKanbanKey, (oldData) => {
          if (!oldData) return oldData as unknown as project_kanban;

          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === column.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: cycle.project_kanban_cycle_columns?.filter(
                      (col) => col.id !== column.id
                    ),
                  }
                : cycle
            ),
          };
        });

        // 2. Update cycle cache with card movement logic
        cache.setQueryData<project_kanban_cycle>(projectCycleKey, (old) => {
          if (!old) return old as unknown as project_kanban_cycle;

          const moveCardsToColumn = variables.query?.project_kanban_cycle_column_id;

          if (moveCardsToColumn) {
            // If there's a target column, move cards
            const deletedColumn = old.project_kanban_cycle_columns?.find(
              (col) => col.id === column.id
            );
            const targetColumn = old.project_kanban_cycle_columns?.find(
              (col) => col.id === moveCardsToColumn
            );

            if (deletedColumn && targetColumn) {
              const updatedColumns = old.project_kanban_cycle_columns?.map((col) => {
                if (col.id === moveCardsToColumn) {
                  // Merge cards from deleted column with target column
                  const mergedCards = [
                    ...(col.project_kanban_cycle_cards || []),
                    ...(deletedColumn.project_kanban_cycle_cards || []).map((c) => ({
                      ...c,
                      project_kanban_cycle_column_id: targetColumn.id,
                    })),
                  ];

                  return {
                    ...col,
                    project_kanban_cycle_cards: mergedCards,
                  };
                }
                return col;
              });

              return {
                ...old,
                project_kanban_cycle_columns: updatedColumns?.filter(
                  (col) => col.id !== column.id
                ),
              };
            }
          }

          // If no target column or couldn't move, just remove the column
          return {
            ...old,
            project_kanban_cycle_columns: old.project_kanban_cycle_columns?.filter(
              (col) => col.id !== column.id
            ),
          };
        });
      } finally {
        callbacks?.destroy?.onSuccess?.(column);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  /**
   * Trash query - Lists deleted columns
   */
  const trash = useQuery<Pagination<project_kanban_cycle_column>, Error>({
    queryKey: trashKey,
    queryFn: () => projectKanbanCycleColumnEndpoint.trash!(trashFilters || filters),
    enabled: !!enableTrash,
  });

  /**
   * Restore mutation - Restores a deleted column
   *
   * Business logic:
   * 1. Update cycle cache: add column back with ordering
   */
  const restore = useMutation<project_kanban_cycle_column, Error, string>({
    mutationFn: (columnId) =>
      projectKanbanCycleColumnEndpoint.restore!(columnId) as Promise<project_kanban_cycle_column>,
    onSuccess: (column) => {
      try {
        // Update cycle cache
        cache.insertInNestedArray({
          key: projectCycleKey,
          field: "project_kanban_cycle_columns",
          item: column,
          orderKey: "order",
          orderValue: "asc",
          dataType: "number",
          refetch: false,
        });
      } finally {
        callbacks?.restore?.onSuccess?.(column);
      }
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    store,
    update,
    destroy,
    many,
    trash,
    restore,
  };
};
