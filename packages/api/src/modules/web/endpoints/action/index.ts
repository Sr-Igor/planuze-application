import type { action } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const actionEndpoint = createSimpleEndpoint<action>()({
  basePath: "/api/private/action",
  routes: {
    index: "/api/private/action/index",
  },
});

export type Action = action;

// Direct function exports for backwards compatibility
export const actionIndex = actionEndpoint.index;
