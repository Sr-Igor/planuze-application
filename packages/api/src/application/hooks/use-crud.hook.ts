import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { Pagination } from "@repo/types";

import type {
  BatchDTO,
  IEndpoint,
  QueryFilters,
} from "../../core/domain/interfaces/endpoint.interface";
import { type CacheKeyFunction, useCache } from "../../infrastructure/cache";

/**
 * Callbacks for mutation operations
 */
export interface MutationCallbacks<T> {
  onSuccess?: (data: T | Pagination<T>) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for all CRUD operations
 */
export interface CrudCallbacks<T> {
  store?: MutationCallbacks<T>;
  update?: MutationCallbacks<T>;
  destroy?: MutationCallbacks<T>;
  many?: MutationCallbacks<T[]>;
  restore?: MutationCallbacks<T>;
}

/**
 * Configuration for which queries are enabled
 */
export interface EnabledQueries {
  index?: boolean;
  show?: boolean;
  trash?: boolean;
}

/**
 * Cache keys for an entity
 */
export interface EntityCacheConfig {
  index: CacheKeyFunction;
  show: CacheKeyFunction;
  trash: CacheKeyFunction;
}

/**
 * useCrud hook options
 */
export interface UseCrudOptions<T, CreateDTO = unknown, UpdateDTO = unknown> {
  /**
   * Entity endpoint
   */
  endpoint: IEndpoint<T, CreateDTO, UpdateDTO>;

  /**
   * Cache keys configuration
   */
  cacheKeys: EntityCacheConfig;

  /**
   * Resource ID (for show, update, destroy)
   */
  id?: string | null;

  /**
   * Filters for listings
   */
  filters?: QueryFilters;

  /**
   * Enabled queries
   */
  enabled?: EnabledQueries;

  /**
   * Operation callbacks
   */
  callbacks?: CrudCallbacks<T>;

  /**
   * Placeholder data for loading
   */
  placeholder?: Pagination<T>;
}

/**
 * useCrud hook return
 */
export interface UseCrudReturn<T, CreateDTO = unknown, UpdateDTO = unknown> {
  index: UseQueryResult<Pagination<T>, Error>;
  show: UseQueryResult<T, Error>;
  trash: UseQueryResult<Pagination<T>, Error>;
  store: UseMutationResult<T | Pagination<T>, Error, CreateDTO>;
  update: UseMutationResult<T | Pagination<T>, Error, UpdateDTO>;
  destroy: UseMutationResult<T | Pagination<T>, Error, void>;
  many: UseMutationResult<T[] | Pagination<T>, Error, { ids: string; body: BatchDTO }>;
  restore: UseMutationResult<T | Pagination<T>, Error, void>;
}

/**
 * Determines if filters have special return type
 */
const getReturnType = (
  filters: QueryFilters | undefined,
  method: "index" | "trash"
): QueryFilters | undefined => {
  if (filters && Object.keys(filters).length > 0) {
    return { ...filters, return: method };
  }
  return filters;
};

/**
 * Generic hook for CRUD operations
 *
 * @example
 * ```tsx
 * const { index, show, store, update, destroy } = useCrud({
 *   endpoint: clientEndpoint,
 *   cacheKeys: cacheKeys.client,
 *   id: clientId,
 *   filters: { page: 1 },
 *   enabled: { index: true, show: !!clientId },
 *   callbacks: {
 *     store: { onSuccess: () => toast.success('Client created!') },
 *   },
 * });
 * ```
 */
export function useCrud<T, CreateDTO = unknown, UpdateDTO = unknown>(
  options: UseCrudOptions<T, CreateDTO, UpdateDTO>
): UseCrudReturn<T, CreateDTO, UpdateDTO> {
  const { endpoint, cacheKeys: keys, id, filters, enabled, callbacks, placeholder } = options;

  const cache = useCache();

  // Generate cache keys
  const indexKey = keys.index(filters) || [];
  const showKey = keys.show(id) || [];
  const trashKey = keys.trash(filters) || [];

  // Filters with return type
  const indexFilters = getReturnType(filters, "index");
  const trashFilters = getReturnType(filters, "trash");
  const hasIndexReturn = !!indexFilters?.return;
  const hasTrashReturn = !!trashFilters?.return;

  // Queries
  const index = useQuery<Pagination<T>, Error>({
    queryKey: indexKey,
    queryFn: () => endpoint.index(filters),
    enabled: !!enabled?.index,
    placeholderData: placeholder,
  });

  const show = useQuery<T, Error>({
    queryKey: showKey,
    queryFn: () => endpoint.show(id!),
    enabled: !!enabled?.show && !!id,
  });

  const trash = useQuery<Pagination<T>, Error>({
    queryKey: trashKey,
    queryFn: () => endpoint.trash!(filters),
    enabled: !!enabled?.trash && !!endpoint.trash,
    placeholderData: placeholder,
  });

  // Mutations
  const store = useMutation<T | Pagination<T>, Error, CreateDTO>({
    mutationFn: (body) => endpoint.store(body, indexFilters),
    onSuccess: (data) => {
      hasIndexReturn
        ? cache.replaceIndex({ key: indexKey, data: data as Pagination<T> })
        : cache.invalidateIndex(indexKey);
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<T | Pagination<T>, Error, UpdateDTO>({
    mutationFn: (body) => {
      if (!id) throw new Error("ID is required for update operation");
      return endpoint.update(id, body, indexFilters);
    },
    onSuccess: (data) => {
      if (hasIndexReturn) {
        cache.replaceIndex({ key: indexKey, data: data as Pagination<T> });
      } else {
        cache.invalidateIndex(indexKey);
        if (id) cache.replaceShow({ key: showKey, item: data });
      }
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<T | Pagination<T>, Error, void>({
    mutationFn: () => {
      if (!id) throw new Error("ID is required for destroy operation");
      return endpoint.destroy(id, indexFilters);
    },
    onSuccess: (data) => {
      hasIndexReturn
        ? cache.replaceIndex({ key: indexKey, data: data as Pagination<T> })
        : cache.invalidateIndex(indexKey);
      cache.invalidateTrash(trashKey);
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  const many = useMutation<T[] | Pagination<T>, Error, { ids: string; body: BatchDTO }>({
    mutationFn: ({ ids, body }) => {
      if (!endpoint.many) throw new Error("Many operation not implemented");
      return endpoint.many(ids, body, body.deleted === false ? trashFilters : indexFilters);
    },
    onSuccess: (data, variables) => {
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

      callbacks?.many?.onSuccess?.(data as T[]);
    },
    onError: callbacks?.many?.onError,
  });

  const restore = useMutation<T | Pagination<T>, Error, void>({
    mutationFn: () => {
      if (!endpoint.restore) throw new Error("Restore operation not implemented");
      if (!id) throw new Error("ID is required for restore operation");
      return endpoint.restore(id, trashFilters);
    },
    onSuccess: (data) => {
      hasTrashReturn
        ? cache.replaceIndex({ key: trashKey, data: data as Pagination<T> })
        : cache.invalidateTrash(trashKey);
      cache.invalidateIndex(indexKey);
      callbacks?.restore?.onSuccess?.(data);
    },
    onError: callbacks?.restore?.onError,
  });

  return {
    index,
    show,
    trash,
    store,
    update,
    destroy,
    many,
    restore,
  };
}
