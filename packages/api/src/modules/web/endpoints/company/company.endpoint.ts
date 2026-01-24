import type { company } from "@repo/types";

import { createTypedEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { companyQueries } from "./company.queries";
import type { CreateCompanyDTO, UpdateCompanyDTO } from "./company.types";

/**
 * CRUD endpoint for Company using callEndpoint from @repo/types
 */
export const companyEndpoint = createTypedEndpoint<company, CreateCompanyDTO, UpdateCompanyDTO>({
  basePath: "/api/private/company",
  routes: {
    show: "/api/private/company/show",
    store: "/api/private/company/store",
    update: "/api/private/company/update",
  },
  queries: companyQueries,
  formDataFields: ["logo"],
});
