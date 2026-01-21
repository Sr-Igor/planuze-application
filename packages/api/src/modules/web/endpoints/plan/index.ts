import type { Pagination, plan, Prisma } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

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
  indexPublic: () =>
    typedRequest<Pagination<plan>>()({
      route: "/api/public/plan/index",
      query: planQuery,
    }),

  /**
   * List plans (private/authenticated)
   */
  indexPrivate: () =>
    typedRequest<Pagination<plan>>()({
      route: "/api/private/plan/index",
      query: planQuery,
    }),
};

export type Plan = plan;

// Direct function exports for backwards compatibility
export const planIndexPublic = planEndpoint.indexPublic;
export const planIndexPrivate = planEndpoint.indexPrivate;
