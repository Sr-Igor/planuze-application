import type { project_config } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectConfigEndpoint = createSimpleEndpoint<project_config>()({
  basePath: "/api/private/project_config",
  routes: {
    index: "/api/private/project_config/index",
    show: "/api/private/project_config/show",
    store: "/api/private/project_config/store",
    update: "/api/private/project_config/update",
    destroy: "/api/private/project_config/destroy",
    many: "/api/private/project_config/many",
  },
  defaultQuery: {
    include: {
      logs,
      project_version: true,
    },
  },
});

export type ProjectConfig = project_config;

// Direct function exports for backwards compatibility
export const projectConfigIndex = projectConfigEndpoint.index;
export const projectConfigShow = projectConfigEndpoint.show;
export const projectConfigStore = projectConfigEndpoint.store;
export const projectConfigUpdate = projectConfigEndpoint.update;
export const projectConfigDestroy = projectConfigEndpoint.destroy;
export const projectConfigMany = projectConfigEndpoint.many;
