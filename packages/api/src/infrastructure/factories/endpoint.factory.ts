import type { AxiosRequestConfig } from "axios";

import { callEndpoint, type Pagination, type Routes } from "@repo/types";

import { setFormData } from "../../application/services/form-data.service";
import type {
  BatchDTO,
  EndpointConfig,
  IEndpoint,
  QueryFilters,
} from "../../core/domain/interfaces/endpoint.interface";
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
  index?: Routes;
  show?: Routes;
  store?: Routes;
  update?: Routes;
  destroy?: Routes;
  many?: Routes;
  trash?: Routes;
  restore?: Routes;
}

type TooltipState = {
  success?: boolean;
  error?: boolean;
};
export interface Tooltips {
  index?: TooltipState;
  show?: TooltipState;
  store?: TooltipState;
  update?: TooltipState;
  destroy?: TooltipState;
  many?: TooltipState;
  trash?: TooltipState;
  restore?: TooltipState;
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

  /**
   * Tooltips for each action
   */
  tooltips?: Tooltips;
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
  const { routes, queries, formDataFields, tooltips } = config;

  return {
    index: async (filters?: QueryFilters): Promise<Pagination<T>> => {
      const mergedFilters = mergeFilters(filters, queries?.index);

      const handle = callEndpoint({
        route: routes.index,
        query: mergedFilters,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<Pagination<T>>(handle.method, handle.url, undefined, undefined, {
        showSuccess: tooltips?.index?.success,
        hideError: tooltips?.index ? !tooltips.index.error : undefined,
      });
    },

    show: async (id: string): Promise<T> => {
      const handle = callEndpoint({
        route: routes.show,
        params: { id },
        query: queries?.show,
      } as Parameters<typeof callEndpoint>[0]);

      return handleRequest<T>(handle.method, handle.url, undefined, undefined, {
        showSuccess: tooltips?.show?.success,
        hideError: tooltips?.show ? !tooltips.show.error : true,
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
        {
          showSuccess: tooltips?.store?.success ?? true,
          hideError: tooltips?.store ? !tooltips.store.error : undefined,
        }
      );
    },

    update: async (
      id: string,
      body: UpdateDTO,
      filters?: QueryFilters
    ): Promise<T | Pagination<T>> => {
      const mergedFilters = mergeFilters(filters, queries?.update);
      const prepared = prepareBody({ ...body }, formDataFields);

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
        {
          showSuccess: tooltips?.update?.success ?? true,
          hideError: tooltips?.update ? !tooltips.update.error : undefined,
        }
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
        showSuccess: tooltips?.destroy?.success ?? true,
        hideError: tooltips?.destroy ? !tooltips.destroy.error : undefined,
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
            showSuccess: tooltips?.many?.success ?? true,
            hideError: tooltips?.many ? !tooltips.many.error : undefined,
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

          return handleRequest<Pagination<T>>(handle.method, handle.url, undefined, undefined, {
            showSuccess: tooltips?.trash?.success,
            hideError: tooltips?.trash ? !tooltips.trash.error : undefined,
          });
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
            showSuccess: tooltips?.restore?.success ?? true,
            hideError: tooltips?.restore ? !tooltips.restore.error : undefined,
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
  index?: Routes;
  show?: Routes;
  store?: Routes;
  update?: Routes;
  destroy?: Routes;
  many?: Routes;
  trash?: Routes;
  restore?: Routes;
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
   * Default query parameters to include in all requests
   * Use this for includes, orderBy, etc.
   *
   * @example
   * ```ts
   * defaultQuery: {
   *   include: {
   *     company: { select: { logo: true } },
   *     logs: logsInclude, // Only for entities with logs relation
   *   },
   *   orderKey: 'createdAt',
   *   orderValue: 'desc',
   * }
   * ```
   */
  defaultQuery?: Record<string, unknown>;

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
    const { basePath, routes, defaultQuery = {}, formDataFields } = config;

    const buildUrl = (action: string) => `${basePath}/${action}`;

    const endpoint: Record<string, unknown> = {};

    if (routes.index) {
      endpoint.index = async (filters?: QueryFilters): Promise<Pagination<T>> => {
        return handleRequest<Pagination<T>>("GET", buildUrl("index"), undefined, {
          params: { ...defaultQuery, ...filters },
        });
      };
    }

    if (routes.show) {
      endpoint.show = async (id: string): Promise<T> => {
        // Use callEndpoint to properly handle params as path parameters (like old project)
        const handle = callEndpoint({
          route: routes.show,
          params: { id },
          query: defaultQuery,
        } as Parameters<typeof callEndpoint>[0]);

        return handleRequest<T>(handle.method, handle.url, undefined, undefined, {
          hideError: true,
        });
      };
    }

    if (routes.store) {
      endpoint.store = async (
        body: Partial<T>,
        filters?: QueryFilters
      ): Promise<T | Pagination<T>> => {
        const sendFilters = filters?.return ? filters : {};

        const prepared = prepareBody(body, formDataFields);
        return handleRequest<T | Pagination<T>>(
          "POST",
          buildUrl("store"),
          prepared.body,
          { ...prepared.config, params: { ...defaultQuery, ...sendFilters } },
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
        const sendFilters = filters?.return ? filters : {};

        const prepared = prepareBody({ ...body }, formDataFields);
        // Use callEndpoint to properly handle params as path parameters (like old project)
        const handle = callEndpoint({
          route: routes.update,
          params: { id },
          body: prepared.body,
          query: { ...defaultQuery, ...sendFilters },
        } as Parameters<typeof callEndpoint>[0]);

        return handleRequest<T | Pagination<T>>(
          handle.method,
          handle.url,
          prepared.body,
          prepared.config,
          { showSuccess: true }
        );
      };
    }

    if (routes.destroy) {
      endpoint.destroy = async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
        const sendFilters = filters?.return ? filters : {};
        // Use callEndpoint to properly handle params as path parameters (like old project)
        const handle = callEndpoint({
          route: routes.destroy,
          params: { id },
          query: { ...defaultQuery, ...sendFilters },
        } as Parameters<typeof callEndpoint>[0]);

        return handleRequest<T | Pagination<T>>(handle.method, handle.url, undefined, undefined, {
          showSuccess: true,
        });
      };
    }

    if (routes.many) {
      endpoint.many = async (
        ids: string,
        body: BatchDTO,
        filters?: QueryFilters
      ): Promise<T[] | Pagination<T>> => {
        // Use callEndpoint to properly handle params as path parameters (like old project)
        const sendFilters = filters?.return ? filters : {};
        const handle = callEndpoint({
          route: routes.many,
          params: { ids },
          body,
          query: { ...defaultQuery, ...sendFilters },
        } as Parameters<typeof callEndpoint>[0]);

        return handleRequest<T[] | Pagination<T>>(handle.method, handle.url, body, undefined, {
          showSuccess: true,
        });
      };
    }

    if (routes.trash) {
      endpoint.trash = async (filters?: QueryFilters): Promise<Pagination<T>> => {
        return handleRequest<Pagination<T>>("GET", buildUrl("trash"), undefined, {
          params: { ...defaultQuery, ...filters },
        });
      };
    }

    if (routes.restore) {
      endpoint.restore = async (id: string, filters?: QueryFilters): Promise<T | Pagination<T>> => {
        // Use callEndpoint to properly handle params as path parameters (like old project)
        const handle = callEndpoint({
          route: routes.restore,
          params: { id },
          query: { ...defaultQuery, ...filters },
        } as Parameters<typeof callEndpoint>[0]);

        return handleRequest<T | Pagination<T>>(handle.method, handle.url, undefined, undefined, {
          showSuccess: true,
        });
      };
    }

    return endpoint as InferredEndpoint<T, R>;
  };
};
