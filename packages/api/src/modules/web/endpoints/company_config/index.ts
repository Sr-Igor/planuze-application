import type { company_config } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const companyConfigEndpoint = createSimpleEndpoint<company_config>()({
  basePath: "/api/private/company_config",
  routes: {
    show: "/api/private/company_config/show",
    store: "/api/private/company_config/store",
    update: "/api/private/company_config/update",
  },
});

export type CompanyConfig = company_config;

// Direct function exports for backwards compatibility
export const companyConfigShow = companyConfigEndpoint.show;
export const companyConfigUpdate = companyConfigEndpoint.update;
