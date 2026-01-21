import type { company } from "@repo/types";

import { createTypedEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { companyQueries } from "./company.queries";
import type { CreateCompanyDTO, UpdateCompanyDTO } from "./company.types";

/**
 * Typed routes for company endpoint
 * Note: Company doesn't have index, destroy, many, trash, restore in original
 */
const companyRoutes = {
  index: "/api/private/company/index",
  show: "/api/private/company/show",
  store: "/api/private/company/store",
  update: "/api/private/company/update",
  destroy: "/api/private/company/destroy",
} as const;

/**
 * CRUD endpoint for Company using callEndpoint from @repo/types
 */
export const companyEndpoint = createTypedEndpoint<company, CreateCompanyDTO, UpdateCompanyDTO>({
  basePath: "/api/private/company",
  routes: companyRoutes,
  queries: companyQueries,
  formDataFields: ["logo"],
});
