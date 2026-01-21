import type { level } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const levelEndpoint = createSimpleEndpoint<level>()({
  basePath: "/api/private/level",
  routes: {
    index: "/api/private/level/index",
    show: "/api/private/level/show",
    store: "/api/private/level/store",
    update: "/api/private/level/update",
    destroy: "/api/private/level/destroy",
    many: "/api/private/level/many",
    trash: "/api/private/level/trash",
    restore: "/api/private/level/restore",
  },
  defaultQuery: {
    include: {
      logs,
      level_actions: {
        include: {
          action: true,
          feature: true,
        },
      },
      profiles: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
            },
          },
        },
      },
    },
  },
});

export type Level = level;

// Direct function exports for backwards compatibility
export const levelIndex = levelEndpoint.index;
export const levelShow = levelEndpoint.show;
export const levelStore = levelEndpoint.store;
export const levelUpdate = levelEndpoint.update;
export const levelDestroy = levelEndpoint.destroy;
export const levelMany = levelEndpoint.many;
export const levelTrash = levelEndpoint.trash;
export const levelRestore = levelEndpoint.restore;
