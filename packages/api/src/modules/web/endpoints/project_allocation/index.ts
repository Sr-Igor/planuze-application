import type { project_allocation } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectAllocationEndpoint = createSimpleEndpoint<project_allocation>()({
  basePath: "/api/private/project_allocation",
  routes: {
    index: "/api/private/project_allocation/index",
    store: "/api/private/project_allocation/store",
    update: "/api/private/project_allocation/update",
    destroy: "/api/private/project_allocation/destroy",
    many: "/api/private/project_allocation/many",
  },
});

export type ProjectAllocation = project_allocation;

// Direct function exports for backwards compatibility
export const projectAllocationIndex = projectAllocationEndpoint.index;
export const projectAllocationStore = projectAllocationEndpoint.store;
export const projectAllocationUpdate = projectAllocationEndpoint.update;
export const projectAllocationDestroy = projectAllocationEndpoint.destroy;
export const projectAllocationMany = projectAllocationEndpoint.many;
