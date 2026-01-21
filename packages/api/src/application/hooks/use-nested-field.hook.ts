import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import type { Pagination } from "@repo/types";

import type { IEndpoint } from "../../core/domain/interfaces/endpoint.interface";
import { type CacheKeyFunction, useCache } from "../../infrastructure/cache";

/**
 * Callbacks for mutation operations
 */
export interface NestedFieldMutationCallbacks<T> {
  onSuccess?: (data: T | Pagination<T>) => void;
  onError?: (error: Error) => void;
}

/**
 * Callbacks for all operations
 */
export interface NestedFieldCallbacks<T> {
  store?: NestedFieldMutationCallbacks<T>;
  update?: NestedFieldMutationCallbacks<T>;
}

/**
 * Cache keys for an entity
 */
export interface NestedFieldCacheConfig {
  index?: CacheKeyFunction;
  show?: CacheKeyFunction;
  trash?: CacheKeyFunction;
}

/**
 * useNestedField hook options
 */
export interface UseNestedFieldOptions<T> {
  /**
   * Entity endpoint
   */
  endpoint: Partial<IEndpoint<T>>;

  /**
   * Cache keys for the root/parent entity
   */
  rootCacheKeys: NestedFieldCacheConfig;

  /**
   * Field name in parent entity that contains this object
   */
  field: string;

  /**
   * Access key for the parent entity (usually parent ID)
   */
  accessKey?: string;

  /**
   * Resource ID (for update)
   */
  id?: string | null;

  /**
   * Operation callbacks
   */
  callbacks?: NestedFieldCallbacks<T>;
}

/**
 * useNestedField hook return
 */
export interface UseNestedFieldReturn<T> {
  store: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
  update: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
}

/**
 * Hook for managing nested single objects in parent entities
 * Useful for relations like client.address, profile.address, etc.
 *
 * @example
 * ```tsx
 * const { store, update } = useNestedField({
 *   endpoint: clientAddressEndpoint,
 *   rootCacheKeys: cacheKeys.client,
 *   field: 'client_address',
 *   accessKey: clientId,
 *   id: addressId,
 * });
 * ```
 */
export function useNestedField<T extends { id: string }>(
  options: UseNestedFieldOptions<T>
): UseNestedFieldReturn<T> {
  const { endpoint, rootCacheKeys, field, accessKey, id, callbacks } = options;

  const cache = useCache();

  // Generate cache keys
  const showKey = rootCacheKeys.show?.(accessKey) || [];

  // Mutations
  const store = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body) => {
      if (!endpoint.store) throw new Error("Store method not implemented");
      return endpoint.store(body);
    },
    onSuccess: (data) => {
      cache.insertNestedField({
        key: showKey,
        field,
        item: data,
        refetch: false,
      });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<T | Pagination<T>, Error, Partial<T>>({
    mutationFn: (body) => {
      if (!endpoint.update) throw new Error("Update method not implemented");
      if (!id) throw new Error("ID is required for update operation");
      return endpoint.update(id, body);
    },
    onSuccess: (data) => {
      cache.updateNestedField({
        key: showKey,
        field,
        item: data,
        refetch: false,
      });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return {
    store,
    update,
  };
}
