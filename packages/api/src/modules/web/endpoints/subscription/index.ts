import type { Pagination, subscription } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Default query for subscription with full includes
 * Note: Complex nested includes require explicit casting due to Prisma type constraints
 */
const subscriptionQuery = {
  include: {
    subscription_plan: {
      include: {
        subscription_plan_features: {
          include: {
            feature: {
              include: {
                module: true,
              },
            },
            subscription_plan_feature_actions: true,
          },
        },
      },
    },
    company: {
      include: {
        company_invoices: {
          orderBy: {
            createdAt: "desc" as const,
          },
        },
        subscription_changes: {
          include: {
            to_plan: true,
            from_plan: true,
          },
          orderBy: {
            createdAt: "desc" as const,
          },
        },
      },
    },
  },
  orderKey: "createdAt",
  orderValue: "desc",
};

/**
 * Subscription endpoints
 */
export const subscriptionEndpoint = {
  /**
   * List subscriptions
   */
  index: () =>
    typedRequest<Pagination<subscription>>()({
      route: "/api/private/subscription/index",
      query: subscriptionQuery as any,
    }),

  /**
   * Get current subscription
   * Note: id is optional - if not provided, returns current user's subscription
   */
  show: () =>
    typedRequest<subscription>()(
      {
        route: "/api/private/subscription/show",
        params: { id: "" },
      },
      { hideError: true }
    ),

  /**
   * Update subscription to a new price
   */
  update: (priceId: string) =>
    typedRequest<{ url: string }>()({
      route: "/api/private/subscription/update",
      params: { price_id: priceId },
    }),
};

export type Subscription = subscription;

// Direct function exports for backwards compatibility
export const subscriptionIndex = subscriptionEndpoint.index;
export const subscriptionShow = subscriptionEndpoint.show;
export const subscriptionUpdate = subscriptionEndpoint.update;
