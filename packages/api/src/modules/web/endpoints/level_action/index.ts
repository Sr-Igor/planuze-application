import type { level_action } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Level Action Types
// =============================================================================

/**
 * Body type for level action update
 * Note: The endpoint type says 'actions: string' but the frontend sends Record<string, string[]>
 * which gets serialized by the backend. We use a custom type to match actual usage.
 */
export type LevelActionUpdateBody = {
  actions: Record<string, string[]> | string;
  module_id: string;
};

/**
 * Level Action endpoints
 */
export const levelActionEndpoint = {
  /**
   * Update level action
   */
  update: (id: string, body: LevelActionUpdateBody) =>
    typedRequest<level_action>()(
      {
        route: "/api/private/level_action/update",
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

export type LevelAction = level_action;

// Direct function exports for backwards compatibility
export const levelActionUpdate = levelActionEndpoint.update;
