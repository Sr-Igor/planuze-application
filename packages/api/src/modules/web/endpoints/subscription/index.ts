import type { Pagination, subscription } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Default query for subscription with full includes
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
            createdAt: "desc",
          },
        },
        subscription_changes: {
          include: {
            to_plan: true,
            from_plan: true,
          },
          orderBy: {
            createdAt: "desc",
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
  index: async (): Promise<Pagination<subscription>> => {
    return handleRequest<Pagination<subscription>>(
      "GET",
      "/api/private/subscription/index",
      undefined,
      {
        params: subscriptionQuery,
      }
    );
  },

  /**
   * Get current subscription
   */
  show: async (): Promise<subscription> => {
    return handleRequest<subscription>("GET", `/api/private/subscription/show`, undefined, {
      params: { id: "" },
    });
  },

  /**
   * Update subscription to a new price
   */
  update: async (priceId: string): Promise<{ url: string }> => {
    return handleRequest<{ url: string }>("PUT", `/api/private/subscription/update`, undefined, {
      params: { price_id: priceId },
    });
  },
};

export type Subscription = subscription;

// Direct function exports for backwards compatibility
export const subscriptionIndex = subscriptionEndpoint.index;
export const subscriptionShow = subscriptionEndpoint.show;
export const subscriptionUpdate = subscriptionEndpoint.update;
