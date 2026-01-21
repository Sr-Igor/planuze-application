import type { level_action } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Level Action endpoints
 */
export const levelActionEndpoint = {
  /**
   * Update level action
   */
  update: async (id: string, body: any) => {
    return handleRequest<level_action>(
      "PUT",
      `/api/private/level_action/update`,
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

export type LevelAction = level_action;

// Direct function exports for backwards compatibility
export const levelActionUpdate = levelActionEndpoint.update;
