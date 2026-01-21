import type { EndpointBody, EndpointQuery, Prisma, profile } from "@repo/types";

// =============================================================================
// Profile types - derived from endpoint definitions
// =============================================================================

/**
 * Base Profile type (re-export from @repo/types)
 */
export type Profile = profile;

/**
 * DTO for profile creation - derived from store endpoint body
 */
export type CreateProfileDTO = EndpointBody<"/api/private/profile/store">;

/**
 * DTO for profile update - derived from update endpoint body
 */
export type UpdateProfileDTO = EndpointBody<"/api/private/profile/update">;

/**
 * Query params for profile index - derived from index endpoint query
 */
export type ProfileIndexQuery = EndpointQuery<"/api/private/profile/index">;

/**
 * Prisma include type for profile queries
 */
export type ProfileInclude = Prisma.profileInclude;

/**
 * Prisma select type for profile queries
 */
export type ProfileSelect = Prisma.profileSelect;
