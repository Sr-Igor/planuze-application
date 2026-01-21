import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination } from "@repo/types";

import type { IEndpoint, QueryFilters } from "../../core/domain/interfaces/endpoint.interface";
import { type CacheKeyFunction, type SortOptions, useCache } from "../../infrastructure/cache";

/**
 * Callbacks for mutation operations
 */
export interface NestedArrayMutationCallbacks<T> {
  onSuccess?: (data: T | Pagination<T>) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for many operations
 */
export interface NestedArrayManyCallbacks<T> {
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for all operations
 */
export interface NestedArrayCallbacks<T> {
  store?: NestedArrayMutationCallbacks<T>;
  update?: NestedArrayMutationCallbacks<T>;
  destroy?: NestedArrayMutationCallbacks<T>;
  restore?: NestedArrayMutationCallbacks<T>;
  many?: NestedArrayManyCallbacks<T>;
}

/**
 * Cache keys for an entity
 */
export interface NestedArrayCacheConfig {
  index?: CacheKeyFunction;
  show?: CacheKeyFunction;
  trash?: CacheKeyFunction;
}

/**
 * useNestedArray hook options
 */
export interface UseNestedArrayOptions<T> {
  /**
   * Entity endpoint
   */
  endpoint: Partial<IEndpoint<T>>;

  /**
   * Cache keys for this entity
   */
  cacheKeys: NestedArrayCacheConfig;

  /**
   * Cache keys for the root/parent entity
   */
  rootCacheKeys: NestedArrayCacheConfig;

  /**
   * Field name in parent entity that contains this array
   */
  field: string;

  /**
   * Access key for the parent entity (usually parent ID)
   */
  accessKey?: string;

  /**
   * Resource ID (for update, destroy)
   */
  id?: string | null;

  /**
   * Filters for trash query
   */
  filters?: QueryFilters;

  /**
   * Enable trash query
   */
  enableTrash?: boolean;

  /**
   * Operation callbacks
   */
  callbacks?: NestedArrayCallbacks<T>;

  /**
   * Sort options for nested array
   */
  nestedArrayOptions?: SortOptions;
}

/**
 * Many mutation input type
 */
export interface NestedArrayManyInput<T> {
  ids?: string | string[];
  id?: string;
  body: Partial<T> | Partial<T>[];
}

/**
 * Destroy mutation input type - supports both void and { id, query } format
 */
export type NestedArrayDestroyInput<T> = void | { id: string; query?: Partial<T> };

/**
 * useNestedArray hook return
 */
export interface UseNestedArrayReturn<T> {
  index: UseQueryResult<Pagination<T>, Error>;
  store: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
  update: UseMutationResult<
    T | Pagination<T>,
    Error,
    Partial<T> | { id: string; body: Partial<T> }
  >;
  destroy: UseMutationResult<T | Pagination<T>, Error, NestedArrayDestroyInput<T>>;
  many: UseMutationResult<T[] | Pagination<T>, Error, NestedArrayManyInput<T>>;
  trash: UseQueryResult<Pagination<T>, Error>;
  restore: UseMutationResult<T | Pagination<T>, Error, string | undefined>;
}

/**
 * Hook for managing nested arrays in parent entities
 * Useful for relations like client.contacts[], profile.documents[], etc.
 *
 * @example
 * ```tsx
 * const { store, update, destroy } = useNestedArray({
 *   endpoint: clientContactEndpoint,
 *   cacheKeys: cacheKeys.client_contact,
 *   rootCacheKeys: cacheKeys.client,
 *   field: 'client_contacts',
 *   accessKey: clientId,
 * });
 * ```
 */
export function useNestedArray<T extends { id: string }>(
  options: UseNestedArrayOptions<T>
): UseNestedArrayReturn<T> {
  const {
    endpoint,
    cacheKeys: keys,
    rootCacheKeys,
    field,
    accessKey,
    id,
    filters,
    enableTrash,
    callbacks,
    nestedArrayOptions,
  } = options;

  const cache = useCache();

  // Generate cache keys
  const showKey = rootCacheKeys.show?.(accessKey) || [];
  const trashKey = keys.trash?.(accessKey) || [];
  const indexKey = keys.index?.(filters) || [];

  // Queries
  const index = useQuery<Pagination<T>, Error>({
    queryKey: indexKey,
    queryFn: () => {
      if (!endpoint.index) throw new Error("Index method not implemented");
      return endpoint.index(filters);
    },
    enabled: !!indexKey.length && !!endpoint.index,
  });

  const trash = useQuery<Pagination<T>, Error>({
    queryKey: trashKey,
    queryFn: () => {
      if (!endpoint.trash) throw new Error("Trash method not implemented");
      return endpoint.trash(filters);
    },
    enabled: !!enableTrash,
  });

  // Mutations
  const store = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body) => {
      if (!endpoint.store) throw new Error("Store method not implemented");
      return endpoint.store(body);
    },
    onSuccess: (data) => {
      cache.insertInNestedArray({
        key: showKey,
        field,
        item: data,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<
    T | Pagination<T>,
    Error,
    Partial<T> | { id: string; body: Partial<T> }
  >({
    mutationFn: (data) => {
      const hasIdAndBody = (d: unknown): d is { id: string; body: Partial<T> } =>
        typeof d === "object" && d !== null && "id" in d && "body" in d;

      const itemId = hasIdAndBody(data) ? data.id : id;
      const body = hasIdAndBody(data) ? data.body : data;

      if (!endpoint.update) throw new Error("Update method not implemented");
      if (!itemId) throw new Error("ID is required for update operation");
      return endpoint.update(itemId, body);
    },
    onSuccess: (data) => {
      cache.updateInNestedArray({
        key: showKey,
        field,
        item: data,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<T | Pagination<T>, Error, NestedArrayDestroyInput<T>>({
    mutationFn: (input) => {
      if (!endpoint.destroy) throw new Error("Destroy method not implemented");
      // Support both { id, query } format and void format
      const isObjectWithId = input && typeof input === "object" && "id" in input;
      const destroyId = isObjectWithId ? (input as { id: string }).id : id;
      if (!destroyId) throw new Error("ID is required for destroy operation");
      return endpoint.destroy(destroyId);
    },
    onSuccess: (data) => {
      cache.invalidateQueries(trashKey);
      cache.destroyInNestedArray({
        key: showKey,
        field,
        item: data,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  const many = useMutation<T[] | Pagination<T>, Error, NestedArrayManyInput<T>>({
    mutationFn: ({ ids, id: itemId, body }) => {
      if (!endpoint.many) throw new Error("Many method not implemented");
      let idsParam = itemId || "";
      if (ids) {
        idsParam = Array.isArray(ids) ? ids.join(",") : ids;
      }
      return endpoint.many(idsParam, body as any, filters);
    },
    onSuccess: (data) => {
      // Invalidate to refetch with updated data
      cache.invalidateQueries(showKey);
      const resultData = Array.isArray(data) ? data : data.data || [];
      callbacks?.many?.onSuccess?.(resultData);
    },
    onError: callbacks?.many?.onError,
  });

  const restore = useMutation<T | Pagination<T>, Error, string | undefined>({
    mutationFn: (itemId) => {
      if (!endpoint.restore) throw new Error("Restore method not implemented");
      const restoreId = itemId || id;
      if (!restoreId) throw new Error("ID is required for restore operation");
      return endpoint.restore(restoreId);
    },
    onSuccess: (data) => {
      cache.invalidateQueries(trashKey);
      cache.insertInNestedArray({
        key: showKey,
        field,
        item: data,
        ...nestedArrayOptions,
        refetch: false,
      });
      callbacks?.restore?.onSuccess?.(data);
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    index,
    store,
    update,
    destroy,
    many,
    trash,
    restore,
  };
}
