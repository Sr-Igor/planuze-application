import * as api from "#/web/req/project_kanban_cycle_allocation";
import { useCache } from "#/cache";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { project_kanban_cycle_allocation } from "@repo/types";

import { Pagination } from "../../../@types";

export const useProjectKanbanCycleAllocation = ({
  callbacks,
  filters,
  trashFilters,
  id,
  enabledIndex,
  enableTrash,
}: IUseCallerProps<project_kanban_cycle_allocation>) => {
  const indexKey = keys.project_kanban_cycle_allocation.index(filters);
  const trashKey = keys.project_kanban_cycle_allocation.trash(trashFilters || filters);
  const projectCycleKey = keys.project_kanban_cycle.show(filters?.project_kanban_cycle_id);

  const cache = useCache();

  const index = useQuery<Pagination<project_kanban_cycle_allocation>>({
    queryKey: indexKey,
    queryFn: () => api.index(filters),
    enabled: !!enabledIndex,
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
    mutationFn: () => api.destroy(id!),
    onSuccess: (e) => {
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
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  const trash = useQuery<Pagination<project_kanban_cycle_allocation>>({
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

  return { index, store, destroy, trash, restore, update };
};
