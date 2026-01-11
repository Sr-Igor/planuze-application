import { useMutation, useQuery } from "@tanstack/react-query";

import { project_kanban_cycle_card_type } from "@repo/api/generator/types";

import { useCache } from "@/api/cache";
import keys from "@/api/cache/keys";
import * as api from "@/api/req/project_kanban_cycle_card_type";
import { IUseCallerProps } from "@/api/types";
import { Pagination } from "@/types/pagination";

import { placeholder } from "./placeholder";

export const useProjectKanbanCycleCardType = ({
  callbacks,
  filters,
  trashFilters,
  id,
  enabledIndex,
  enableTrash,
  cycleId,
}: IUseCallerProps<project_kanban_cycle_card_type> & { cycleId?: string }) => {
  const indexKey = keys.project_kanban_cycle_card_type.index(filters);
  const trashKey = keys.project_kanban_cycle_card_type.trash(trashFilters || filters);
  const projectCycleKey = keys.project_kanban_cycle.show(cycleId);
  const cache = useCache();

  const index = useQuery<Pagination<project_kanban_cycle_card_type>>({
    queryKey: indexKey,
    queryFn: () => api.index(filters),
    enabled: !!enabledIndex,
    placeholderData: () => placeholder,
  });

  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: (e) => {
      cache.insertInIndex({
        key: indexKey,
        item: e,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: any) => api.update(id!, body),
    onSuccess: (e) => {
      cache.updateInIndex({
        key: indexKey,
        item: e,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation({
    mutationFn: (data: { id: string; query: any }) => api.destroy(data.id, data.query),
    onSuccess: (e, variables) => {
      try {
        const cardTypeId = variables.id;
        const isDelete = variables.query.delete_cards;
        const newCardTypeId = variables.query.project_kanban_cycle_card_type_id;

        if (projectCycleKey) {
          cache.setQueryData(projectCycleKey, (old: any) => {
            if (!old) return old;

            return {
              ...old,
              project_kanban_cycle_columns: old.project_kanban_cycle_columns?.map((column: any) => {
                if (isDelete) {
                  return {
                    ...column,
                    project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
                      (card: any) => card.project_kanban_cycle_card_type_id !== cardTypeId
                    ),
                  };
                } else {
                  return {
                    ...column,
                    project_kanban_cycle_cards: column.project_kanban_cycle_cards?.map(
                      (card: any) => {
                        if (card.project_kanban_cycle_card_type_id === cardTypeId) {
                          return {
                            ...card,
                            project_kanban_cycle_card_type_id: newCardTypeId,
                          };
                        }
                        return card;
                      }
                    ),
                  };
                }
              }),
            };
          });
        }

        cache.destroyInIndex({
          key: indexKey,
          item: e,
          orderKey: "createdAt",
          orderValue: "desc",
          dataType: "date",
          refetch: false,
        });
        cache.insertInIndex({
          key: trashKey,
          item: e,
          orderKey: "createdAt",
          orderValue: "desc",
          dataType: "date",
          refetch: false,
        });
      } finally {
        callbacks?.destroy?.onSuccess?.(e);
      }
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useQuery<Pagination<project_kanban_cycle_card_type>>({
    queryKey: trashKey,
    queryFn: () => api.trash(trashFilters || filters),
    enabled: !!enableTrash,
  });

  const restore = useMutation({
    mutationFn: (item: string) => api.restore(item),
    onSuccess: (e) => {
      cache.destroyInIndex({
        key: trashKey,
        item: e,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      cache.insertInIndex({
        key: indexKey,
        item: e,
        orderKey: "createdAt",
        orderValue: "desc",
        dataType: "date",
        refetch: false,
      });
      callbacks?.restore?.onSuccess?.(e);
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, destroy, trash, restore, update, index };
};
