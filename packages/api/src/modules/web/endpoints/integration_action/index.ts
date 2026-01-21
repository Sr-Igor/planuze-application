import type { integration_action } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Integration Action Types
// =============================================================================

/**
 * Body type for integration action update
 * Note: The endpoint type says 'actions: string' but the frontend sends Record<string, string[]>
 * which gets serialized by the backend. We use a custom type to match actual usage.
 */
export type IntegrationActionUpdateBody = {
  actions: Record<string, string[]> | string;
  module_id: string;
};

/**
 * Integration Action endpoints
 */
export const integrationActionEndpoint = {
  /**
   * Update integration action
   */
  update: (id: string, body: IntegrationActionUpdateBody) =>
    typedRequest<integration_action>()(
      {
        route: "/api/private/integration_action/update",
        params: { id },
        body: body as any,
        query: {
          include: {
            action: true,
            feature: true,
          },
        },
      },
      { showSuccess: true }
    ),
};

export type IntegrationAction = integration_action;

// Direct function exports for backwards compatibility
export const integrationActionUpdate = integrationActionEndpoint.update;
