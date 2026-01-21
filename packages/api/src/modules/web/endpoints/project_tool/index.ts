import type { project_tool } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectToolEndpoint = createSimpleEndpoint<project_tool>()({
  basePath: "/api/private/project_tool",
  routes: {
    index: "/api/private/project_tool/index",
    store: "/api/private/project_tool/store",
    update: "/api/private/project_tool/update",
    destroy: "/api/private/project_tool/destroy",
    many: "/api/private/project_tool/many",
  },
  defaultQuery: {
    include: {
      logs,
      project_version: true,
    },
  },
});

export type ProjectTool = project_tool;

// Direct function exports for backwards compatibility
export const projectToolIndex = projectToolEndpoint.index;
export const projectToolStore = projectToolEndpoint.store;
export const projectToolUpdate = projectToolEndpoint.update;
export const projectToolDestroy = projectToolEndpoint.destroy;
export const projectToolMany = projectToolEndpoint.many;
