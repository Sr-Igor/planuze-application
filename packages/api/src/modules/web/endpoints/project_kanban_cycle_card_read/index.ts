import type { project_kanban_cycle_card_read } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Project Kanban Cycle Card Read endpoints
 */
export const projectKanbanCycleCardReadEndpoint = {
  /**
   * Mark card as read
   */
  store: async (body: any) => {
    return handleRequest<project_kanban_cycle_card_read>(
      "POST",
      "/api/private/project_kanban_cycle_card_read/store",
      body,
      {
        params: {
          include: {
            profile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      }
    );
  },
};

export type ProjectKanbanCycleCardRead = project_kanban_cycle_card_read;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardReadStore = projectKanbanCycleCardReadEndpoint.store;
