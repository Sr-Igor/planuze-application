import type { company, EndpointBody, Prisma } from "@repo/types";

// =============================================================================
// Company types - derived from endpoint definitions
// =============================================================================

/**
 * Base Company type (re-export from @repo/types)
 */
export type Company = company;

/**
 * DTO for company creation - derived from store endpoint body
 */
export type CreateCompanyDTO = EndpointBody<"/api/private/company/store">;

/**
 * DTO for company update - derived from update endpoint body
 */
export type UpdateCompanyDTO = EndpointBody<"/api/private/company/update">;

/**
 * Prisma include type for company queries
 */
export type CompanyInclude = Prisma.companyInclude;

/**
 * Prisma select type for company queries
 */
export type CompanySelect = Prisma.companySelect;
