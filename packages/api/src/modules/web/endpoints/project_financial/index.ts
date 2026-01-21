import type { project_financial } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectFinancialEndpoint = createSimpleEndpoint<project_financial>()({
  basePath: "/api/private/project_financial",
  routes: {
    index: "/api/private/project_financial/index",
    store: "/api/private/project_financial/store",
    update: "/api/private/project_financial/update",
    destroy: "/api/private/project_financial/destroy",
    many: "/api/private/project_financial/many",
  },
});

export type ProjectFinancial = project_financial;

// Direct function exports for backwards compatibility
export const projectFinancialIndex = projectFinancialEndpoint.index;
export const projectFinancialStore = projectFinancialEndpoint.store;
export const projectFinancialUpdate = projectFinancialEndpoint.update;
export const projectFinancialDestroy = projectFinancialEndpoint.destroy;
export const projectFinancialMany = projectFinancialEndpoint.many;
