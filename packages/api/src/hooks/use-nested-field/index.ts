import { useMutation } from "@tanstack/react-query";

import { useCache } from "../../cache";
import keys from "../../cache/keys";
import { CacheKeyFunction, CacheKeys } from "../use-base/types";
import { IUseNestedFieldProps, IUseNestedFieldReturn } from "./types";

export function useNestedField<T, K extends CacheKeys = CacheKeys>({
  callbacks,
  id,
  cache: cacheKey,
  api,
  field,
  accessKey,
  rootCache,
}: IUseNestedFieldProps<T, K>): IUseNestedFieldReturn<T> {
  const rootCacheConfig = keys[rootCache] as Record<string, CacheKeyFunction>;

  const showKey = rootCacheConfig.show?.(accessKey) || [];
  const cache = useCache();

  const store = useMutation({
    mutationFn: (body: any) => {
      if (!api.store)
        throw new Error(`API store method not implemented for cache key: ${String(cacheKey)}`);
      return api.store(body);
    },
    onSuccess: (e) => {
      cache.insertNestedField({
        key: showKey,
        field,
        item: e,
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: any) => {
      if (!api.update)
        throw new Error(`API update method not implemented for cache key: ${String(cacheKey)}`);
      if (!id) throw new Error("ID is required for update operation");
      return api.update(id, body);
    },
    onSuccess: (e) => {
      cache.updateNestedField({
        key: showKey,
        field,
        item: e,
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  return { store, update };
}
