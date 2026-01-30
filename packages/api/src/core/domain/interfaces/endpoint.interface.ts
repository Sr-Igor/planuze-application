import type { Pagination, Query } from "@repo/types";

/**
 * Query filters for listings
 * Extends base Query from @repo/types with additional fields
 */
export interface QueryFilters extends Query {
  perPage?: number;
  order?: "asc" | "desc";
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
  where?: Record<string, unknown>;
  return?: string;
  [key: string]: unknown;
}

/**
 * Re-export Routes for convenience
 */
export type { Routes } from "@repo/types";

/**
 * DTO for batch operations
 */
export interface BatchDTO {
  deleted?: boolean;
  [key: string]: unknown;
}

/**
 * Endpoint configuration
 */
export interface EndpointConfig {
  basePath: string;
  queries?: {
    index?: Record<string, unknown>;
    show?: Record<string, unknown>;
    store?: Record<string, unknown>;
    update?: Record<string, unknown>;
    destroy?: Record<string, unknown>;
    many?: Record<string, unknown>;
    trash?: Record<string, unknown>;
    restore?: Record<string, unknown>;
  };
  formDataFields?: string[];
}

/**
 * Generic contract for CRUD endpoints
 * CreateDTO and UpdateDTO default to unknown to allow any input type
 */
export interface IEndpoint<T, CreateDTO = unknown, UpdateDTO = unknown> {
  /**
   * List resources with pagination
   */
  index(filters?: QueryFilters): Promise<Pagination<T>>;

  /**
   * Get a resource by ID
   */
  show(id: string): Promise<T>;

  /**
   * Create a new resource
   */
  store(body: CreateDTO, filters?: QueryFilters): Promise<T | Pagination<T>>;

  /**
   * Update an existing resource
   */
  update(id: string, body: UpdateDTO, filters?: QueryFilters): Promise<T | Pagination<T>>;

  /**
   * Remove a resource (soft delete)
   */
  destroy(id: string, filters?: QueryFilters): Promise<T | Pagination<T>>;

  /**
   * Batch operation
   */
  many?(ids: string, body: BatchDTO, filters?: QueryFilters): Promise<T[] | Pagination<T>>;

  /**
   * List trashed resources
   */
  trash?(filters?: QueryFilters): Promise<Pagination<T>>;

  /**
   * Restore a resource from trash
   */
  restore?(id: string, filters?: QueryFilters): Promise<T | Pagination<T>>;
}

/**
 * Optional methods that an endpoint can implement
 */
export type EndpointMethod = keyof IEndpoint<unknown>;
