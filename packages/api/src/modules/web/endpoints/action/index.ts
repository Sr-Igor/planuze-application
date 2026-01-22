import type { action, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Action endpoint - uses PUBLIC route (no authentication required)
 * Matches old-project structure: /api/public/action/index
 */
export const actionEndpoint = {
  index: (filters?: Record<string, unknown>): Promise<Pagination<action>> => {
    return typedRequest<Pagination<action>>()({
      route: "/api/public/action/index",
      query: {
        ...filters,
        orderKey: "createdAt",
        orderValue: "asc",
      },
    });
  },
};

export type Action = action;

// Direct function exports for backwards compatibility
export const actionIndex = actionEndpoint.index;
