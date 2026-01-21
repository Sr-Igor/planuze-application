import type { Pagination, plan, Prisma } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Default query for plans with features
 */
const planQuery: { include: Prisma.planInclude } = {
  include: {
    plan_features: {
      include: {
        feature: {
          include: {
            module: true,
          },
        },
      },
    },
  },
};

/**
 * Plan endpoints
 */
export const planEndpoint = {
  /**
   * List plans (public)
   */
  indexPublic: async () => {
    return handleRequest<Pagination<plan>>("GET", "/api/public/plan/index", undefined, {
      params: planQuery,
    });
  },

  /**
   * List plans (private/authenticated)
   */
  indexPrivate: async () => {
    return handleRequest<Pagination<plan>>("GET", "/api/private/plan/index", undefined, {
      params: planQuery,
    });
  },
};

export type Plan = plan;

// Direct function exports for backwards compatibility
export const planIndexPublic = planEndpoint.indexPublic;
export const planIndexPrivate = planEndpoint.indexPrivate;
