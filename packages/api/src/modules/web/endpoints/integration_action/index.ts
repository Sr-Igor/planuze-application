import type { integration_action } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Integration Action endpoints
 */
export const integrationActionEndpoint = {
  /**
   * Update integration action
   */
  update: async (id: string, body: any) => {
    return handleRequest<integration_action>(
      "PUT",
      `/api/private/integration_action/update`,
      body,
      {
        params: {
          id,
          include: {
            action: true,
            feature: true,
          },
        },
      },
      { showSuccess: true }
    );
  },
};

export type IntegrationAction = integration_action;

// Direct function exports for backwards compatibility
export const integrationActionUpdate = integrationActionEndpoint.update;
