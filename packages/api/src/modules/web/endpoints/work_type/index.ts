import type { work_type } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const workTypeEndpoint = createSimpleEndpoint<work_type>()({
  basePath: "/api/private/work_type",
  routes: {
    index: "/api/private/work_type/index",
    show: "/api/private/work_type/show",
    store: "/api/private/work_type/store",
    update: "/api/private/work_type/update",
    destroy: "/api/private/work_type/destroy",
    many: "/api/private/work_type/many",
    trash: "/api/private/work_type/trash",
    restore: "/api/private/work_type/restore",
  },
});

export type WorkType = work_type;

// Direct function exports for backwards compatibility
export const workTypeIndex = workTypeEndpoint.index;
export const workTypeShow = workTypeEndpoint.show;
export const workTypeStore = workTypeEndpoint.store;
export const workTypeUpdate = workTypeEndpoint.update;
export const workTypeDestroy = workTypeEndpoint.destroy;
export const workTypeMany = workTypeEndpoint.many;
export const workTypeTrash = workTypeEndpoint.trash;
export const workTypeRestore = workTypeEndpoint.restore;
