import type { client } from "@repo/types";

import { createTypedEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { clientQueries } from "./client.queries";
import type { CreateClientDTO, UpdateClientDTO } from "./client.types";

/**
 * Typed routes for client endpoint
 * These routes are validated against @repo/types Routes
 */
const clientRoutes = {
  index: "/api/private/client/index",
  show: "/api/private/client/show",
  store: "/api/private/client/store",
  update: "/api/private/client/update",
  destroy: "/api/private/client/destroy",
  many: "/api/private/client/many",
  trash: "/api/private/client/trash",
  restore: "/api/private/client/restore",
} as const;

/**
 * CRUD endpoint for Client using callEndpoint from @repo/types
 *
 * Uses the typed factory to create standardized operations with full type safety.
 * File fields (avatar) are automatically converted to FormData.
 */
export const clientEndpoint = createTypedEndpoint<client, CreateClientDTO, UpdateClientDTO>({
  basePath: "/api/private/client",
  routes: clientRoutes,
  queries: clientQueries,
  formDataFields: ["avatar"],
});
