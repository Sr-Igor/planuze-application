import { useMutation, useQuery } from "@tanstack/react-query";

import { Pagination } from "../../@types";
import { useCache } from "../../cache";
import keys from "../../cache/keys";
import { CacheKeyFunction, CacheKeys } from "../use-base/types";
import { IUseNestedArrayProps, IUseNestedArrayReturn } from "./types";

export function useNestedArray<T, K extends CacheKeys = CacheKeys>({
  callbacks,
  id,
  filters,
  enableTrash,
  cache: cacheKey,
  api,
  field,
  accessKey,
  rootCache,
  nestedArrayOptions,
}: IUseNestedArrayProps<T, K>): IUseNestedArrayReturn<T> {
  const cacheConfig = keys[cacheKey] as Record<string, CacheKeyFunction>;
  const rootCacheConfig = keys[rootCache] as Record<string, CacheKeyFunction>;

  const showKey = rootCacheConfig.show?.(accessKey) || [];
  const trashKey = cacheConfig.trash?.(accessKey) || [];
  const cache = useCache();

  const trash = useQuery<Pagination<T>>({
    queryKey: trashKey,
    queryFn: () => {
      if (!api.trash)
        throw new Error(`API trash method not implemented for cache key: ${String(cacheKey)}`);
      return api.trash(filters);
    },
    enabled: !!enableTrash,
  });

  const store = useMutation({
    mutationFn: (body: any) => {
      if (!api.store)
        throw new Error(`API store method not implemented for cache key: ${String(cacheKey)}`);
      return api.store(body);
    },
    onSuccess: (e) => {
      cache.insertInNestedArray({
        key: showKey,
        field,
        item: e,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (data: any) => {
      const itemId = data.id || id;
      const body = data.body || data;

      if (!api.update)
        throw new Error(`API update method not implemented for cache key: ${String(cacheKey)}`);
      if (!itemId) throw new Error("ID is required for update operation");
      return api.update(itemId, body);
    },
    onSuccess: (e) => {
      cache.updateInNestedArray({
        key: showKey,
        field,
        item: e,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation({
    mutationFn: () => {
      if (!api.destroy)
        throw new Error(`API destroy method not implemented for cache key: ${String(cacheKey)}`);
      if (!id) throw new Error("ID is required for destroy operation");
      return api.destroy(id);
    },
    onSuccess: (e) => {
      cache.invalidateQueries(trashKey);
      cache.destroyInNestedArray({
        key: showKey,
        field,
        item: e,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  const restore = useMutation({
    mutationFn: (item: string) => {
      if (!api.restore)
        throw new Error(`API restore method not implemented for cache key: ${String(cacheKey)}`);
      return api.restore(item);
    },
    onSuccess: (e) => {
      cache.invalidateQueries(trashKey);
      cache.insertInNestedArray({
        key: showKey,
        field,
        item: e,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.restore?.onSuccess?.(e);
    },
    onError: callbacks?.restore?.onError,
  });

  return { store, update, destroy, trash, restore };
}
