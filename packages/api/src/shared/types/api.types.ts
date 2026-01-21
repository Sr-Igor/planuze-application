import type { Pagination } from "@repo/types";

import type { QueryFilters } from "../../core/domain/interfaces/endpoint.interface";

/**
 * Base props for caller hooks
 */
export interface UseCallerProps<T> {
  /**
   * Filters for listings
   */
  filters?: QueryFilters;

  /**
   * Filters for trash
   */
  trashFilters?: QueryFilters;

  /**
   * Resource ID
   */
  id?: string | null;

  /**
   * Enables listing query
   */
  enabledIndex?: boolean;

  /**
   * Enables show query
   */
  enabledShow?: boolean;

  /**
   * Enables trash query
   */
  enableTrash?: boolean;

  /**
   * Operation callbacks
   */
  callbacks?: {
    store?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    update?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    upsert?: {
      onSuccess?: (data: T) => void;
      onError?: () => void;
    };
    destroy?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    many?: {
      onSuccess?: (data: T[] | Pagination<T[]>) => void;
      onError?: () => void;
    };
    restore?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
  };
}

/**
 * Standard query with Prisma includes
 * Re-exports Prisma namespace for convenience
 */
export type { Prisma } from "@repo/types";

/**
 * Generic Prisma query configuration
 */
export interface PrismaQuery<TInclude = unknown, TSelect = unknown> {
  include?: TInclude;
  select?: TSelect;
  orderBy?: Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">>;
  where?: Record<string, unknown>;
}
