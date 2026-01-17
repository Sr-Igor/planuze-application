import { useMutation, useQuery } from "@tanstack/react-query";

import { Pagination } from "../../@types";
import { useCache } from "../../cache";
import keys from "../../cache/keys";
import { CacheKeyFunction, CacheKeys, IUseBaseProps, IUseBaseReturn } from "./types";

const getReturnType = (filters: Record<string, any> | undefined, method: "index" | "trash") => {
  if (Object.keys(filters || {}).length > 0) {
    return {
      ...filters,
      return: method,
    };
  }

  return filters;
};

export function useBase<T, K extends CacheKeys = CacheKeys>({
  callbacks,
  filters,
  enabledIndex,
  id,
  enableTrash,
  enabledShow,
  api,
  cache: cacheKey,
  placeholder,
}: IUseBaseProps<T, K>): IUseBaseReturn<T> {
  const cacheConfig = keys[cacheKey] as Record<string, CacheKeyFunction>;
  const indexKey = cacheConfig.index?.(filters) || [];
  const trashKey = cacheConfig.trash?.(filters) || [];
  const showKey = cacheConfig.show?.(id) || [];

  const indexFilters = getReturnType(filters, "index");
  const trashFilters = getReturnType(filters, "trash");
  const hasIndexReturn = indexFilters?.return;
  const hasTrashReturn = trashFilters?.return;

  const cache = useCache();

  const index = useQuery<Pagination<T>, Error>({
    queryKey: indexKey,
    queryFn: () => {
      if (!api.index)
        throw new Error(`API index method not implemented for cache key: ${String(cacheKey)}`);
      return api.index(filters);
    },
    enabled: !!enabledIndex,
    placeholderData: placeholder,
  });

  const show = useQuery<T, Error>({
    queryKey: showKey,
    queryFn: () => {
      if (!api.show)
        throw new Error(`API show method not implemented for cache key: ${String(cacheKey)}`);
      return api.show(id!);
    },
    enabled: !!enabledShow,
  });

  const store = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body: Partial<T>) => {
      if (!api.store)
        throw new Error(`API store method not implemented for cache key: ${String(cacheKey)}`);
      return api.store(body, indexFilters);
    },
    onSuccess: (data: T | Pagination<T>) => {
      hasIndexReturn
        ? cache.replaceIndex({ key: indexKey, data: data as Pagination<T> })
        : cache.invalidateIndex(indexKey);
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body: Partial<T>) => {
      if (!api.update)
        throw new Error(`API update method not implemented for cache key: ${String(cacheKey)}`);
      if (!id) throw new Error("ID is required for update operation");
      return api.update(id, body, indexFilters);
    },
    onSuccess: (data: T | Pagination<T>) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.invalidateIndex(indexKey);
        id && cache.replaceShow({ key: showKey, item: data });
      }

      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<Pagination<T> | T, Error, void>({
    mutationFn: () => {
      if (!api.destroy)
        throw new Error(`API destroy method not implemented for cache key: ${String(cacheKey)}`);
      if (!id) throw new Error("ID is required for destroy operation");
      return api.destroy(id, indexFilters);
    },
    onSuccess: (data: Pagination<T> | T) => {
      hasIndexReturn
        ? cache.replaceIndex({ key: indexKey, data: data as Pagination<T> })
        : cache.invalidateIndex(indexKey);
      cache.invalidateTrash(trashKey);
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  const many = useMutation<
    Pagination<T> | T[],
    Error,
    { ids: string; body: { deleted?: boolean } & Record<string, any> }
  >({
    mutationFn: ({ ids, body }) => {
      if (!api.many)
        throw new Error(`API many method not implemented for cache key: ${String(cacheKey)}`);
      return api.many(ids, body, body.deleted === false ? trashFilters : indexFilters);
    },
    onSuccess: (data: Pagination<T> | T[], variables) => {
      if (hasTrashReturn && variables.body.deleted === false) {
        cache.replaceIndex({ key: trashKey, data: data as Pagination<T> });
      } else if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.invalidateQueries(indexKey);
        cache.invalidateQueries(trashKey);
      }

      if (variables.body.deleted) {
        cache.invalidateTrash(trashKey);
      } else if (variables.body.deleted === false) {
        cache.invalidateIndex(indexKey);
      }

      callbacks?.many?.onSuccess?.(data);
    },
    onError: callbacks?.many?.onError,
  });

  const trash = useQuery<Pagination<T>, Error>({
    queryKey: trashKey,
    queryFn: () => {
      if (!api.trash)
        throw new Error(`API trash method not implemented for cache key: ${String(cacheKey)}`);
      return api.trash(filters);
    },
    enabled: !!enableTrash,
    placeholderData: placeholder,
  });

  const restore = useMutation<Pagination<T> | T, Error, string | void>({
    mutationFn: () => {
      if (!api.restore)
        throw new Error(`API restore method not implemented for cache key: ${String(cacheKey)}`);
      if (!id) throw new Error("ID is required for restore operation");
      return api.restore(id, trashFilters);
    },
    onSuccess: (data: Pagination<T> | T) => {
      hasTrashReturn
        ? cache.replaceIndex({ key: trashKey, data: data as Pagination<T> })
        : cache.invalidateTrash(trashKey);
      cache.invalidateIndex(indexKey);
      callbacks?.restore?.onSuccess?.(data);
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, show, index, update, destroy, many, trash, restore };
}
