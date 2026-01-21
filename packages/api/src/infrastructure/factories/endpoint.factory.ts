import type { AxiosRequestConfig } from "axios";

import { callEndpoint, type Pagination } from "@repo/types";

import { setFormData } from "../../application/services/form-data.service";
import type {
  BatchDTO,
  EndpointConfig,
  IEndpoint,
  QueryFilters,
} from "../../core/domain/interfaces/endpoint.interface";
import { logs } from "../../shared/constants";
import { handleRequest } from "../http/axios-client";

/**
 * Merges filters with endpoint default queries
 */
const mergeFilters = (
  filters?: QueryFilters,
  defaultQuery?: Record<string, unknown>
): QueryFilters => {
  if (!defaultQuery) return filters ?? {};
  return { ...filters, ...defaultQuery };
};

/**
 * Prepares the body for sending, converting to FormData if necessary
 */
const prepareBody = (
  body: unknown,
  formDataFields?: string[]
): { body: unknown; config?: AxiosRequestConfig } => {
  if (!formDataFields || formDataFields.length === 0) {
    return { body };
  }

  return {
    body: setFormData(body as Record<string, unknown>, formDataFields),
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  };
};

/**
 * Route configuration for typed endpoints
 */
export interface TypedEndpointRoutes {
  index: string;
  show: string;
  store: string;
  update: string;
  destroy: string;
  many?: string;
  trash?: string;
  restore?: string;
}

/**
 * Options for typed endpoint creation using callEndpoint
 */
export interface CreateTypedEndpointOptions<T> extends EndpointConfig {
  /**
   * Typed routes from @repo/types
   */
  routes: TypedEndpointRoutes;

  /**
   * Placeholder for loading data
   */
  placeholder?: Pagination<T>;
}

/**
 * Factory to create typed CRUD endpoints using callEndpoint from @repo/types
 *
 * @example
 * ```ts
 * const clientEndpoint = createTypedEndpoint<client>({
 *   basePath: '/api/private/client',
 *   routes: {
 *     index: '/api/private/client/index',
 *     show: '/api/private/client/show',
 *     store: '/api/private/client/store',
 *     update: '/api/private/client/update',
 *     destroy: '/api/private/client/destroy',
 *     many: '/api/private/client/many',
 *     trash: '/api/private/client/trash',
 *     restore: '/api/private/client/restore',
 *   },
 *   queries: {
 *     show: { include: { client_address: true } },
 *   },
 *   formDataFields: ['avatar'],
 * });
 * ```
 */
export const createTypedEndpoint = <T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>>(
  config: CreateTypedEndpointOptions<T>
): IEndpoint<T, CreateDTO, UpdateDTO> => {
  const { routes, queries, formDataFields } = config;

  return {
    index: async (filters?: QueryFilters): Promise<Pagination<T>> => {
      const mergedFilters = mergeFilters(filters, queries?.index);

      const handle = callEndpoint({
        route: routes.index,
        query: mergedFilters,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<Pagination<T>>(handle.method, handle.url);
    },

    show: async (id: string): Promise<T> => {
      const handle = callEndpoint({
        route: routes.show,
        params: { id },
        query: queries?.show,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<T>(handle.method, handle.url, undefined, undefined, {
        hideError: true,
      });
    },

    store: async (body: CreateDTO, filters?: QueryFilters): Promise<T | Pagination<T>> => {
      const mergedFilters = mergeFilters(filters, queries?.store);
      const prepared = prepareBody(body, formDataFields);

      const handle = callEndpoint({
        route: routes.store,
        body: prepared.body,
        query: mergedFilters,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<T | Pagination<T>>(
        handle.method,
        handle.url,
        prepared.body,
        prepared.config,
        { showSuccess: true }
      );
    },

    update: async (
      id: string,
      body: UpdateDTO,
      filters?: QueryFilters
    ): Promise<T | Pagination<T>> => {
      const mergedFilters = mergeFilters(filters, queries?.update);
      const prepared = prepareBody({ id, ...body }, formDataFields);

      const handle = callEndpoint({
        route: routes.update,
        params: { id },
        body: prepared.body,
        query: mergedFilters,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<T | Pagination<T>>(
        handle.method,
        handle.url,
        prepared.body,
        prepared.config,
        { showSuccess: true }
      );
    },

    destroy: async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
      const mergedFilters = mergeFilters(filters);

      const handle = callEndpoint({
        route: routes.destroy,
        params: { id },
        query: mergedFilters,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<T | Pagination<T>>(handle.method, handle.url, undefined, undefined, {
        showSuccess: true,
      });
    },

    many: routes.many
      ? async (
          ids: string,
          body: BatchDTO,
          filters?: QueryFilters
        ): Promise<T[] | Pagination<T>> => {
          const mergedFilters = mergeFilters(filters);

          const handle = callEndpoint({
            route: routes.many!,
            params: { ids },
            body,
            query: mergedFilters,
          } as Parameters<typeof callEndpoint>[0]);

          return handleRequest<T[] | Pagination<T>>(handle.method, handle.url, body, undefined, {
            showSuccess: true,
          });
        }
      : undefined,

    trash: routes.trash
      ? async (filters?: QueryFilters): Promise<Pagination<T>> => {
          const mergedFilters = mergeFilters(filters, queries?.index);

          const handle = callEndpoint({
            route: routes.trash!,
            query: mergedFilters,
          } as Parameters<typeof callEndpoint>[0]);

          return handleRequest<Pagination<T>>(handle.method, handle.url);
        }
      : undefined,

    restore: routes.restore
      ? async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
          const mergedFilters = mergeFilters(filters);

          const handle = callEndpoint({
            route: routes.restore!,
            params: { id },
            query: mergedFilters,
          } as Parameters<typeof callEndpoint>[0]);

          return handleRequest<T | Pagination<T>>(handle.method, handle.url, undefined, undefined, {
            showSuccess: true,
          });
        }
      : undefined,
  };
};

// =============================================================================
// Simple Endpoint Factory (for partial CRUD operations)
// =============================================================================

/**
 * Simple route configuration - all routes are optional
 */
export interface SimpleEndpointRoutes {
  index?: string;
  show?: string;
  store?: string;
  update?: string;
  destroy?: string;
  many?: string;
  trash?: string;
  restore?: string;
}

/**
 * Options for simple endpoint creation with generic routes type
 */
export interface CreateSimpleEndpointOptions<R extends SimpleEndpointRoutes> {
  /**
   * Base path for the endpoint (e.g., "/api/private/client_address")
   */
  basePath: string;

  /**
   * Available routes (only define the ones that exist)
   */
  routes: R;

  /**
   * Include logs in queries (default: true)
   */
  includeLogs?: boolean;

  /**
   * Additional includes for queries
   */
  additionalIncludes?: Record<string, unknown>;

  /**
   * Fields that should be sent as FormData
   */
  formDataFields?: string[];
}

/**
 * Inferred endpoint type based on provided routes
 * Only includes methods for routes that were actually defined
 */
export type InferredEndpoint<T, R extends SimpleEndpointRoutes> = {
  [K in keyof R as R[K] extends string ? K : never]: K extends "index"
    ? (filters?: QueryFilters) => Promise<Pagination<T>>
    : K extends "show"
      ? (id: string) => Promise<T>
      : K extends "store"
        ? (body: Partial<T>, filters?: QueryFilters) => Promise<T | Pagination<T>>
        : K extends "update"
          ? (id: string, body: Partial<T>, filters?: QueryFilters) => Promise<T | Pagination<T>>
          : K extends "destroy"
            ? (id: string, filters?: QueryFilters) => Promise<T | Pagination<T>>
            : K extends "many"
              ? (
                  ids: string,
                  body: BatchDTO,
                  filters?: QueryFilters
                ) => Promise<T[] | Pagination<T>>
              : K extends "trash"
                ? (filters?: QueryFilters) => Promise<Pagination<T>>
                : K extends "restore"
                  ? (id: string, filters?: QueryFilters) => Promise<T | Pagination<T>>
                  : never;
};

/**
 * Factory to create simple CRUD endpoints with minimal configuration
 * Use this for entities that don't need all CRUD operations
 *
 * The return type is automatically inferred based on the routes provided,
 * eliminating the need for non-null assertions (!) when using the endpoint.
 *
 * @example
 * ```ts
 * const clientAddressEndpoint = createSimpleEndpoint<client_address>()({
 *   basePath: '/api/private/client_address',
 *   routes: {
 *     store: '/api/private/client_address/store',
 *     update: '/api/private/client_address/update',
 *   },
 * });
 *
 * // TypeScript knows these exist:
 * clientAddressEndpoint.store({ ... }); // OK
 * clientAddressEndpoint.update('id', { ... }); // OK
 *
 * // TypeScript error - index was not defined:
 * clientAddressEndpoint.index(); // Error: Property 'index' does not exist
 * ```
 */
export const createSimpleEndpoint = <T>() => {
  return <R extends SimpleEndpointRoutes>(
    config: CreateSimpleEndpointOptions<R>
  ): InferredEndpoint<T, R> => {
    const {
      basePath,
      routes,
      includeLogs = true,
      additionalIncludes = {},
      formDataFields,
    } = config;

    const baseQuery = {
      include: {
        ...(includeLogs ? logs.include : {}),
        ...additionalIncludes,
      },
    };

    const buildUrl = (action: string) => `${basePath}/${action}`;

    const endpoint: Record<string, unknown> = {};

    if (routes.index) {
      endpoint.index = async (filters?: QueryFilters): Promise<Pagination<T>> => {
        return handleRequest<Pagination<T>>("GET", buildUrl("index"), undefined, {
          params: { ...filters, ...baseQuery },
        });
      };
    }

    if (routes.show) {
      endpoint.show = async (id: string): Promise<T> => {
        return handleRequest<T>(
          "GET",
          buildUrl("show"),
          undefined,
          { params: { id, ...baseQuery } },
          { hideError: true }
        );
      };
    }

    if (routes.store) {
      endpoint.store = async (
        body: Partial<T>,
        filters?: QueryFilters
      ): Promise<T | Pagination<T>> => {
        const prepared = prepareBody(body, formDataFields);
        return handleRequest<T | Pagination<T>>(
          "POST",
          buildUrl("store"),
          prepared.body,
          { ...prepared.config, params: { ...filters, ...baseQuery } },
          { showSuccess: true }
        );
      };
    }

    if (routes.update) {
      endpoint.update = async (
        id: string,
        body: Partial<T>,
        filters?: QueryFilters
      ): Promise<T | Pagination<T>> => {
        const prepared = prepareBody({ id, ...body }, formDataFields);
        return handleRequest<T | Pagination<T>>(
          "PUT",
          buildUrl("update"),
          prepared.body,
          { ...prepared.config, params: { ...filters, ...baseQuery } },
          { showSuccess: true }
        );
      };
    }

    if (routes.destroy) {
      endpoint.destroy = async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
        return handleRequest<T | Pagination<T>>(
          "DELETE",
          buildUrl("destroy"),
          undefined,
          { params: { id, ...filters, ...baseQuery } },
          { showSuccess: true }
        );
      };
    }

    if (routes.many) {
      endpoint.many = async (
        ids: string,
        body: BatchDTO,
        filters?: QueryFilters
      ): Promise<T[] | Pagination<T>> => {
        return handleRequest<T[] | Pagination<T>>(
          "PUT",
          buildUrl("many"),
          body,
          { params: { ids, ...filters, ...baseQuery } },
          { showSuccess: true }
        );
      };
    }

    if (routes.trash) {
      endpoint.trash = async (filters?: QueryFilters): Promise<Pagination<T>> => {
        return handleRequest<Pagination<T>>("GET", buildUrl("trash"), undefined, {
          params: { ...filters, ...baseQuery },
        });
      };
    }

    if (routes.restore) {
      endpoint.restore = async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
        return handleRequest<T | Pagination<T>>(
          "PUT",
          buildUrl("restore"),
          undefined,
          { params: { id, ...filters, ...baseQuery } },
          { showSuccess: true }
        );
      };
    }

    return endpoint as InferredEndpoint<T, R>;
  };
};
