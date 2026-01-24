import * as api from "#/web/req/project_kanban_cycle_column";
import { useCache } from "#/cache";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  project_kanban,
  project_kanban_cycle,
  project_kanban_cycle_column,
} from "@repo/types";

import { Pagination } from "../../../@types";

export const useProjectKanbanCycleColumn = ({
  callbacks,
  filters,
  trashFilters,
  id,
  enableTrash,
}: IUseCallerProps<project_kanban_cycle_column>) => {
  const trashKey = keys.project_kanban_cycle_column.trash(trashFilters || filters);
  const projectKanbanKey = keys.project_kanban.show(filters?.project_kanban_id);
  const projectCycleKey = keys.project_kanban_cycle.show(filters?.project_kanban_cycle_id);

  const cache = useCache();

  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: (e) => {
      try {
        cache.setQueriesData(projectKanbanKey, (oldData: project_kanban) => {
          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === e.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: [
                      e,
                      ...(cycle.project_kanban_cycle_columns || []),
                    ].sort((a: any, b: any) => b.order - a.order),
                  }
                : cycle
            ),
          };
        });
        cache.insertInNestedArray({
          key: projectCycleKey,
          field: "project_kanban_cycle_columns",
          item: e,
          orderKey: "order",
          orderValue: "asc",
          dataType: "number",
          refetch: false,
        });
      } finally {
        callbacks?.store?.onSuccess?.(e);
      }
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: any) => api.update(id!, body),
    onSuccess: (e) => {
      try {
        cache.setQueriesData(projectKanbanKey, (oldData: project_kanban) => {
          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === e.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: cycle.project_kanban_cycle_columns
                      ?.map((column) => (column.id === e.id ? e : column))
                      .sort((a: any, b: any) => b.order - a.order),
                  }
                : cycle
            ),
          };
        });
        cache.updateInNestedArray({
          key: projectCycleKey,
          field: "project_kanban_cycle_columns",
          item: e,
          orderKey: "order",
          orderValue: "asc",
          dataType: "number",
          refetch: false,
        });
      } finally {
        callbacks?.update?.onSuccess?.(e);
      }
    },
    onError: callbacks?.update?.onError,
  });

  const many = useMutation({
    mutationFn: ({ ids, body }: any) => api.many(ids, body),
    onSuccess: (e: project_kanban_cycle_column[]) => {
      try {
        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          return {
            ...old,
            project_kanban_cycle_columns: old.project_kanban_cycle_columns?.map((column) => {
              const newItem = e.find((item: project_kanban_cycle_column) => item.id === column.id);

              return {
                ...newItem,
                project_kanban_cycle_cards: column.project_kanban_cycle_cards,
              };
            }),
          };
        });
      } finally {
        callbacks?.many?.onSuccess?.(e);
      }
    },
    onError: callbacks?.many?.onError,
  });

  const destroy = useMutation({
    mutationFn: (data: { id: string; query: any }) => api.destroy(data.id, data.query),
    onSuccess: (e, variables) => {
      try {
        cache.setQueriesData(projectKanbanKey, (oldData: project_kanban) => {
          return {
            ...oldData,
            project_kanban_cycles: oldData.project_kanban_cycles?.map((cycle) =>
              cycle.id === e.project_kanban_cycle_id
                ? {
                    ...cycle,
                    project_kanban_cycle_columns: cycle.project_kanban_cycle_columns?.filter(
                      (column) => column.id !== e.id
                    ),
                  }
                : cycle
            ),
          };
        });

        // Lógica corrigida que combina o melhor das duas abordagens
        cache.setQueryData(projectCycleKey, (old: project_kanban_cycle) => {
          if (!old) return old;

          const moveCardsToColumn = variables.query.project_kanban_cycle_column_id;

          if (moveCardsToColumn) {
            // Se há uma coluna de destino, mover os cards
            const deletedColumn = old.project_kanban_cycle_columns?.find(
              (column) => column.id === e.id
            );
            const targetColumn = old.project_kanban_cycle_columns?.find(
              (column) => column.id === moveCardsToColumn
            );

            if (deletedColumn && targetColumn) {
              const updatedColumns = old.project_kanban_cycle_columns?.map((column) => {
                if (column.id === moveCardsToColumn) {
                  // Mesclar cards da coluna deletada com a coluna de destino
                  const mergedCards = [
                    ...(column.project_kanban_cycle_cards || []),
                    ...(deletedColumn.project_kanban_cycle_cards || []).map((c) => ({
                      ...c,
                      project_kanban_cycle_column_id: targetColumn.id,
                    })),
                  ];

                  return {
                    ...column,
                    project_kanban_cycle_cards: mergedCards,
                  };
                }
                return column;
              });

              return {
                ...old,
                project_kanban_cycle_columns: updatedColumns?.filter(
                  (column) => column.id !== e.id
                ),
              };
            }
          }

          // Se não há coluna de destino ou não foi possível mover, apenas remover a coluna
          return {
            ...old,
            project_kanban_cycle_columns: old.project_kanban_cycle_columns?.filter(
              (column) => column.id !== e.id
            ),
          };
        });
      } finally {
        callbacks?.destroy?.onSuccess?.(e);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useQuery<Pagination<project_kanban_cycle_column>>({
    queryKey: trashKey,
    queryFn: () => api.trash(trashFilters || filters),
    enabled: !!enableTrash,
  });

  const restore = useMutation({
    mutationFn: (item: string) => api.restore(item),
    onSuccess: (e) => {
      cache.insertInNestedArray({
        key: projectCycleKey,
        field: "project_kanban_cycle_columns",
        item: e,
        orderKey: "order",
        orderValue: "asc",
        dataType: "number",
        refetch: false,
      });

      callbacks?.restore?.onSuccess?.(e);
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, destroy, trash, restore, update, many };
};
