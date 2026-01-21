import type { module as ModuleType } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const moduleEndpoint = createSimpleEndpoint<ModuleType>()({
  basePath: "/api/private/module",
  routes: {
    index: "/api/private/module/index",
    update: "/api/private/module/update",
  },
});

export type Module = ModuleType;

// Direct function exports for backwards compatibility
export const moduleIndex = moduleEndpoint.index;
export const moduleUpdate = moduleEndpoint.update;
