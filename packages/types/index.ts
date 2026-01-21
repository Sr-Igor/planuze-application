// =============================================================================
// Utility types for extracting endpoint parts
// =============================================================================
import type { Endpoints, Routes } from "./generator/endpoints";

// Re-export all types from generator
export * from "./generator/types/index";
export { callEndpoint } from "./generator";
export type { Routes, RouteConfig, Endpoints } from "./generator/endpoints";
export type { Prisma } from "./generator/prisma-types";
export * from "./global";

/**
 * Extracts the body type from an endpoint route.
 * Returns `never` if the route doesn't have a body.
 *
 * @example
 * ```ts
 * type LoginBody = EndpointBody<"/api/public/auth/login">;
 * // { email: string; password: string }
 * ```
 */
export type EndpointBody<R extends Routes> = Endpoints[R] extends { body: infer B }
  ? B
  : Endpoints[R] extends { body?: infer B }
    ? B | undefined
    : never;

/**
 * Extracts the params type from an endpoint route.
 * Returns `never` if the route doesn't have params.
 *
 * @example
 * ```ts
 * type CodeParams = EndpointParams<"/api/private/auth/code">;
 * // { code: string }
 * ```
 */
export type EndpointParams<R extends Routes> = Endpoints[R] extends { params: infer P } ? P : never;

/**
 * Extracts the query type from an endpoint route.
 * Returns `never` if the route doesn't have query params.
 *
 * @example
 * ```ts
 * type ChatIndexQuery = EndpointQuery<"/api/private/chat/index">;
 * // { limit?: string; page?: string; ... }
 * ```
 */
export type EndpointQuery<R extends Routes> = Endpoints[R] extends { query?: infer Q }
  ? Q
  : Endpoints[R] extends { query: infer Q }
    ? Q
    : never;

/**
 * Extracts the HTTP method from an endpoint route.
 *
 * @example
 * ```ts
 * type LoginMethod = EndpointMethod<"/api/public/auth/login">;
 * // "POST"
 * ```
 */
export type EndpointMethod<R extends Routes> = Endpoints[R]["method"];
