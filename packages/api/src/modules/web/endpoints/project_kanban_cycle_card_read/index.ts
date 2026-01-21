import type { project_kanban_cycle_card_read } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Project Kanban Cycle Card Read Types
// =============================================================================

/**
 * Body type for project kanban cycle card read store
 * Note: project_id may be undefined from frontend, but backend requires it
 */
export type ProjectKanbanCycleCardReadStoreBody = {
  action: string;
  project_id?: string;
  project_kanban_cycle_card_id: string;
};

/**
 * Project Kanban Cycle Card Read endpoints
 */
export const projectKanbanCycleCardReadEndpoint = {
  /**
   * Mark card as read
   */
  store: (body: ProjectKanbanCycleCardReadStoreBody) =>
    typedRequest<project_kanban_cycle_card_read>()({
      route: "/api/private/project_kanban_cycle_card_read/store",
      body: body as any,
      query: {
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
    }),
};

export type ProjectKanbanCycleCardRead = project_kanban_cycle_card_read;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardReadStore = projectKanbanCycleCardReadEndpoint.store;
