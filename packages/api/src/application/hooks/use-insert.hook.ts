import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination } from "@repo/types";

import type { IEndpoint, QueryFilters } from "../../core/domain/interfaces/endpoint.interface";
import { type CacheKeyFunction, useCache } from "../../infrastructure/cache";

/**
 * Callbacks for mutation operations
 */
export interface InsertMutationCallbacks<T> {
  onSuccess?: (data: T | Pagination<T>) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for all operations
 */
export interface InsertCallbacks<T> {
  store?: InsertMutationCallbacks<T>;
  update?: InsertMutationCallbacks<T>;
  destroy?: InsertMutationCallbacks<T>;
  restore?: InsertMutationCallbacks<T>;
  many?: InsertMutationCallbacks<T[]>;
}

/**
 * Cache keys for an entity
 */
export interface InsertCacheConfig {
  index: CacheKeyFunction;
  show: CacheKeyFunction;
  trash: CacheKeyFunction;
}

/**
 * useInsert hook options
 */
export interface UseInsertOptions<T> {
  /**
   * Entity endpoint
   */
  endpoint: Partial<IEndpoint<T>>;

  /**
   * Cache keys configuration
   */
  cacheKeys: InsertCacheConfig;

  /**
   * Resource ID (for show, update, destroy)
   */
  id?: string | null;

  /**
   * Filters for listings
   */
  filters?: QueryFilters;

  /**
   * Enable index query
   */
  enabledIndex?: boolean;

  /**
   * Enable show query
   */
  enabledShow?: boolean;

  /**
   * Enable trash query
   */
  enableTrash?: boolean;

  /**
   * Operation callbacks
   */
  callbacks?: InsertCallbacks<T>;

  /**
   * Placeholder data for loading
   */
  placeholder?: Pagination<T>;
}

/**
 * Many mutation input type
 */
export interface ManyMutationInput<T> {
  ids?: string | string[];
  id?: string;
  body: Partial<T> | Partial<T>[];
}

/**
 * Update mutation input type - supports both direct body and { id, body } format
 */
export type UpdateMutationInput<T> = Partial<T> | { id: string; body: Partial<T> };

/**
 * Destroy mutation input type - supports both void and { id, query } format
 */
export type DestroyMutationInput<T> = void | { id: string; query?: Partial<T> };

/**
 * useInsert hook return
 */
export interface UseInsertReturn<T> {
  index: UseQueryResult<Pagination<T>, Error>;
  show: UseQueryResult<T, Error>;
  showMutation?: UseMutationResult<T, Error, string>;
  store: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
  update: UseMutationResult<T | Pagination<T>, Error, UpdateMutationInput<T>>;
  destroy: UseMutationResult<T | Pagination<T>, Error, DestroyMutationInput<T>>;
  many: UseMutationResult<T[] | Pagination<T>, Error, ManyMutationInput<T>>;
  trash: UseQueryResult<Pagination<T>, Error>;
  restore: UseMutationResult<T | Pagination<T>, Error, string | undefined>;
}

/**
 * Hook for CRUD operations with optimistic cache insertion
 * Unlike useCrud, this hook inserts items directly into cache instead of invalidating
 *
 * @example
 * ```tsx
 * const { index, store, update } = useInsert({
 *   endpoint: clientEndpoint,
 *   cacheKeys: cacheKeys.client,
 *   filters: { page: 1 },
 *   enabledIndex: true,
 * });
 * ```
 */
export function useInsert<T extends { id: string }>(
  options: UseInsertOptions<T>
): UseInsertReturn<T> {
  const {
    endpoint,
    cacheKeys: keys,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    callbacks,
    placeholder,
  } = options;

  const cache = useCache();

  // Generate cache keys
  const indexKey = keys.index(filters) || [];
  const showKey = keys.show(id) || [];
  const trashKey = keys.trash(filters) || [];

  const hasIndexReturn = !!(filters as Record<string, unknown>)?.return;

  // Queries
  const index = useQuery<Pagination<T>, Error>({
    queryKey: indexKey,
    queryFn: () => {
      if (!endpoint.index) throw new Error("Index method not implemented");
      return endpoint.index({ ...filters, return: undefined });
    },
    enabled: !!enabledIndex,
    placeholderData: placeholder,
  });

  const show = useQuery<T, Error>({
    queryKey: showKey,
    queryFn: () => {
      if (!endpoint.show) throw new Error("Show method not implemented");
      if (!id) throw new Error("ID is required for show operation");
      return endpoint.show(id);
    },
    enabled: !!enabledShow && !!id && !!endpoint.show,
  });

  const showMutation = endpoint.show
    ? useMutation<T, Error, string>({
        mutationFn: (ref: string) => endpoint.show!(ref),
        onSuccess: (data) => {
          cache.replaceShow({ key: showKey, item: data });
        },
      })
    : undefined;

  // Mutations with optimistic insertion
  const store = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body) => {
      if (!endpoint.store) throw new Error("Store method not implemented");
      return endpoint.store(body, filters);
    },
    onSuccess: (data) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.insertInIndex({ key: indexKey, item: data });
      }
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<T | Pagination<T>, Error, UpdateMutationInput<T>>({
    mutationFn: (input) => {
      if (!endpoint.update) throw new Error("Update method not implemented");
      // Support both { id, body } format and direct body format
      const isObjectWithIdAndBody =
        input && typeof input === "object" && "id" in input && "body" in input;
      const updateId = isObjectWithIdAndBody ? (input as { id: string; body: Partial<T> }).id : id;
      const body = isObjectWithIdAndBody ? (input as { id: string; body: Partial<T> }).body : input;
      if (!updateId) throw new Error("ID is required for update operation");
      return endpoint.update(updateId, body, filters);
    },
    onSuccess: (data) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.updateInIndex({ key: indexKey, item: data });
        cache.replaceShow({ key: showKey, item: data });
      }
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<T | Pagination<T>, Error, DestroyMutationInput<T>>({
    mutationFn: (input) => {
      if (!endpoint.destroy) throw new Error("Destroy method not implemented");
      // Support both { id, query } format and void format
      const isObjectWithId = input && typeof input === "object" && "id" in input;
      const destroyId = isObjectWithId ? (input as { id: string }).id : id;
      if (!destroyId) throw new Error("ID is required for destroy operation");
      return endpoint.destroy(destroyId, filters);
    },
    onSuccess: (data) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.destroyInIndex({ key: indexKey, item: data });
        cache.insertInIndex({ key: trashKey, item: data });
      }
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  const many = useMutation<T[] | Pagination<T>, Error, ManyMutationInput<T>>({
    mutationFn: ({ ids, id: itemId, body }) => {
      if (!endpoint.many) throw new Error("Many method not implemented");
      let idsParam = itemId || "";
      if (ids) {
        idsParam = Array.isArray(ids) ? ids.join(",") : ids;
      }
      return endpoint.many(idsParam, body as any, filters);
    },
    onSuccess: (data) => {
      // Invalidate index to refetch with updated data
      cache.invalidateIndex(indexKey);
      const resultData = Array.isArray(data) ? data : data.data || [];
      callbacks?.many?.onSuccess?.(resultData);
    },
    onError: callbacks?.many?.onError,
  });

  const trash = useQuery<Pagination<T>, Error>({
    queryKey: trashKey,
    queryFn: () => {
      if (!endpoint.trash) throw new Error("Trash method not implemented");
      return endpoint.trash({ ...filters, return: undefined });
    },
    enabled: !!enableTrash,
  });

  const restore = useMutation<T | Pagination<T>, Error, string | undefined>({
    mutationFn: (itemId?: string) => {
      if (!endpoint.restore) throw new Error("Restore method not implemented");
      const restoreId = itemId || id;
      if (!restoreId) throw new Error("ID is required for restore operation");
      return endpoint.restore(restoreId, filters);
    },
    onSuccess: (data) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
        cache.invalidateIndex(trashKey);
      } else {
        cache.insertInIndex({ key: indexKey, item: data });
        cache.destroyInIndex({ key: trashKey, item: data });
      }
      callbacks?.restore?.onSuccess?.(data);
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    index,
    show,
    showMutation,
    store,
    update,
    destroy,
    many,
    trash,
    restore,
  };
}
