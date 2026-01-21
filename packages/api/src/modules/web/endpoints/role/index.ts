import type { role } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const roleEndpoint = createSimpleEndpoint<role>()({
  basePath: "/api/private/role",
  routes: {
    index: "/api/private/role/index",
    show: "/api/private/role/show",
    store: "/api/private/role/store",
    update: "/api/private/role/update",
    destroy: "/api/private/role/destroy",
    many: "/api/private/role/many",
    trash: "/api/private/role/trash",
    restore: "/api/private/role/restore",
  },
  defaultQuery: {
    include: {
      cost_center: true,
      work_type: true,
      logs,
    },
  },
});

export type Role = role;

// Direct function exports for backwards compatibility
export const roleIndex = roleEndpoint.index;
export const roleShow = roleEndpoint.show;
export const roleStore = roleEndpoint.store;
export const roleUpdate = roleEndpoint.update;
export const roleDestroy = roleEndpoint.destroy;
export const roleMany = roleEndpoint.many;
export const roleTrash = roleEndpoint.trash;
export const roleRestore = roleEndpoint.restore;
