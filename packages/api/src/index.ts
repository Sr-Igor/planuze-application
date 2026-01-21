/**
 * @repo/api-new
 *
 * API library for the Planuze monorepo.
 *
 * This library provides a typed abstraction for API communication,
 * including:
 * - Factory for creating CRUD endpoints
 * - Generic hooks for React Query
 * - Centralized cache system
 * - Interceptors for authentication and error handling
 *
 * ## Structure
 *
 * - `core/` - Domain interfaces and entities
 * - `infrastructure/` - Implementations (HTTP client, cache, factories)
 * - `application/` - Application hooks and services
 * - `modules/` - Endpoints organized by app (web, manager, shared)
 * - `shared/` - Shared types and utilities
 *
 * ## Usage
 *
 * ```tsx
 * // Import specific hook
 * import { useClient } from '@repo/api-new/web';
 *
 * // Use in component
 * const { index, store } = useClient({
 *   enabledIndex: true,
 *   filters: { page: 1 },
 * });
 * ```
 *
 * ## Adding new endpoints
 *
 * 1. Create folder at `modules/web/endpoints/[entity]/`
 * 2. Create files: `[entity].types.ts`, `[entity].queries.ts`, `[entity].endpoint.ts`
 * 3. Create hook at `modules/web/hooks/use-[entity].hook.ts`
 * 4. Export in corresponding `index.ts` files
 */

// =============================================================================
// Core - Domain
// =============================================================================
export * from "./core/domain/entities";
export * from "./core/domain/interfaces";
export * from "./core/domain/value-objects";

// =============================================================================
// Re-exports from @repo/types for convenience
// =============================================================================
export { callEndpoint } from "@repo/types";
export type { Routes, RouteConfig, Endpoints, Prisma, Pagination, Query } from "@repo/types";

// =============================================================================
// Infrastructure
// =============================================================================
export {
  createAxiosClient,
  handleRequest,
  axiosHttpClient,
} from "./infrastructure/http/axios-client";
export {
  createTypedEndpoint,
  createSimpleEndpoint,
} from "./infrastructure/factories/endpoint.factory";
export type {
  TypedEndpointRoutes,
  CreateTypedEndpointOptions,
  SimpleEndpointRoutes,
  CreateSimpleEndpointOptions,
} from "./infrastructure/factories/endpoint.factory";
export {
  useCache,
  cacheKeys,
  cacheKeys as keys,
  createEntityCacheKeys,
} from "./infrastructure/cache";

// =============================================================================
// Application - Hooks & Services
// =============================================================================
export { useCrud } from "./application/hooks/use-crud.hook";
export type {
  UseCrudOptions,
  UseCrudReturn,
  CrudCallbacks,
  EnabledQueries,
  EntityCacheConfig,
} from "./application/hooks/use-crud.hook";

export { useInsert } from "./application/hooks/use-insert.hook";
export type {
  UseInsertOptions,
  UseInsertReturn,
  InsertCallbacks,
  InsertCacheConfig,
} from "./application/hooks/use-insert.hook";

export { useNestedArray } from "./application/hooks/use-nested-array.hook";
export type {
  UseNestedArrayOptions,
  UseNestedArrayReturn,
  NestedArrayCallbacks,
  NestedArrayCacheConfig,
} from "./application/hooks/use-nested-array.hook";

export { useNestedField } from "./application/hooks/use-nested-field.hook";
export type {
  UseNestedFieldOptions,
  UseNestedFieldReturn,
  NestedFieldCallbacks,
  NestedFieldCacheConfig,
} from "./application/hooks/use-nested-field.hook";

export { setFormData, extractFiles } from "./application/services/form-data.service";

// =============================================================================
// Shared - Types, Constants & Services
// =============================================================================
export * from "./shared/types";
export * from "./shared/constants";
export * from "./shared/services";

// =============================================================================
// Modules (re-exports for convenience)
// =============================================================================
// Note: For more specific imports, use:
// - '@repo/api-new/web' for web app endpoints
// - '@repo/api-new/manager' for manager app endpoints
// - '@repo/api-new/shared' for shared endpoints
// =============================================================================

export * as reactQuery from "@tanstack/react-query";
