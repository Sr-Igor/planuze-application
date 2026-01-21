import type { EndpointParams } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Billing DTOs - derived from endpoint types
// =============================================================================

export type BillingCheckoutParams = EndpointParams<"/api/private/billing/checkout">;
export type BillingTestParams = EndpointParams<"/api/private/billing/test">;

/**
 * Billing endpoints
 */
export const billingEndpoint = {
  /**
   * Create checkout session for a price
   */
  checkout: (params: BillingCheckoutParams) =>
    typedRequest<{ url: string }>()({
      route: "/api/private/billing/checkout",
      params,
    }),

  /**
   * Test billing endpoint
   */
  test: (params: BillingTestParams) =>
    typedRequest<{ url: string }>()({
      route: "/api/private/billing/test",
      params,
    }),
};

// Direct function exports for backwards compatibility
export const billingCheckout = billingEndpoint.checkout;
export const billingTest = billingEndpoint.test;
