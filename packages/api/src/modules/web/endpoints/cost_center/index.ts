import type { cost_center } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const costCenterEndpoint = createSimpleEndpoint<cost_center>()({
  basePath: "/api/private/cost_center",
  routes: {
    index: "/api/private/cost_center/index",
    store: "/api/private/cost_center/store",
    update: "/api/private/cost_center/update",
    destroy: "/api/private/cost_center/destroy",
    many: "/api/private/cost_center/many",
    trash: "/api/private/cost_center/trash",
    restore: "/api/private/cost_center/restore",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type CostCenter = cost_center;

// Direct function exports for backwards compatibility
export const costCenterIndex = costCenterEndpoint.index;
export const costCenterStore = costCenterEndpoint.store;
export const costCenterUpdate = costCenterEndpoint.update;
export const costCenterDestroy = costCenterEndpoint.destroy;
export const costCenterMany = costCenterEndpoint.many;
export const costCenterTrash = costCenterEndpoint.trash;
export const costCenterRestore = costCenterEndpoint.restore;
