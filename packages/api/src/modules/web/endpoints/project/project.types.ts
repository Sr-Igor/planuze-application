import type { EndpointBody, EndpointQuery, Prisma, project } from "@repo/types";

// =============================================================================
// Project types - derived from endpoint definitions
// =============================================================================

/**
 * Base Project type (re-export from @repo/types)
 */
export type Project = project;

/**
 * DTO for project creation - derived from store endpoint body
 */
export type CreateProjectDTO = EndpointBody<"/api/private/project/store">;

/**
 * DTO for project update - derived from update endpoint body
 */
export type UpdateProjectDTO = EndpointBody<"/api/private/project/update">;

/**
 * Query params for project index - derived from index endpoint query
 */
export type ProjectIndexQuery = EndpointQuery<"/api/private/project/index">;

/**
 * Prisma include type for project queries
 */
export type ProjectInclude = Prisma.projectInclude;

/**
 * Prisma select type for project queries
 */
export type ProjectSelect = Prisma.projectSelect;
