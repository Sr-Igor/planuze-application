import type { project_version } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectVersionEndpoint = createSimpleEndpoint<project_version>()({
  basePath: "/api/private/project_version",
  routes: {
    index: "/api/private/project_version/index",
    show: "/api/private/project_version/show",
    store: "/api/private/project_version/store",
    update: "/api/private/project_version/update",
    destroy: "/api/private/project_version/destroy",
    many: "/api/private/project_version/many",
  },
  defaultQuery: {
    include: {
      logs,
      owner: {
        select: {
          id: true,
          anonymous_name: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  },
});

export type ProjectVersion = project_version;

// Direct function exports for backwards compatibility
export const projectVersionIndex = projectVersionEndpoint.index;
export const projectVersionShow = projectVersionEndpoint.show;
export const projectVersionStore = projectVersionEndpoint.store;
export const projectVersionUpdate = projectVersionEndpoint.update;
export const projectVersionDestroy = projectVersionEndpoint.destroy;
export const projectVersionMany = projectVersionEndpoint.many;
