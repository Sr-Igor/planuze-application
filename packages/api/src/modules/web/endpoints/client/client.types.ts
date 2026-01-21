import type { client, EndpointBody, EndpointQuery, Prisma } from "@repo/types";

// =============================================================================
// Client types - derived from endpoint definitions
// =============================================================================

/**
 * Base Client type (re-export from @repo/types)
 */
export type Client = client;

/**
 *  DTO for client creation - derived from store endpoint body
 */
export type CreateClientDTO = EndpointBody<"/api/private/client/store">;

/**
 *  DTO for client update - derived from update endpoint body
 */
export type UpdateClientDTO = EndpointBody<"/api/private/client/update">;

/**
 * Query params for client index - derived from index endpoint query
 */
export type ClientIndexQuery = EndpointQuery<"/api/private/client/index">;

/**
 * Prisma include type for client queries
 */
export type ClientInclude = Prisma.clientInclude;

/**
 * Prisma select type for client queries
 */
export type ClientSelect = Prisma.clientSelect;
