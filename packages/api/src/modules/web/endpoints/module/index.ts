import type { module as ModuleType, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Module endpoint - supports both PUBLIC and PRIVATE routes
 * Matches old-project structure:
 * - Public: /api/public/module/index (when not authenticated or no profile/twoAuth)
 * - Private: /api/private/module/index (when authenticated with profile and twoAuth)
 */
export const moduleEndpoint = {
  indexPublic: (filters?: Record<string, unknown>): Promise<Pagination<ModuleType>> => {
    return typedRequest<Pagination<ModuleType>>()({
      route: "/api/public/module/index",
      query: filters,
    });
  },
  indexPrivate: (filters?: Record<string, unknown>): Promise<Pagination<ModuleType>> => {
    return typedRequest<Pagination<ModuleType>>()({
      route: "/api/private/module/index",
      query: filters,
    });
  },
};

export type Module = ModuleType;
