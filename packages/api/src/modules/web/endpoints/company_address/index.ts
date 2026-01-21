import type { company_address } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const companyAddressEndpoint = createSimpleEndpoint<company_address>()({
  basePath: "/api/private/company_address",
  routes: {
    store: "/api/private/company_address/store",
    update: "/api/private/company_address/update",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type CompanyAddress = company_address;

// Direct function exports for backwards compatibility
export const companyAddressStore = companyAddressEndpoint.store;
export const companyAddressUpdate = companyAddressEndpoint.update;
