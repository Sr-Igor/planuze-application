import type { project_kanban_cycle_card_comment } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanCycleCardCommentEndpoint =
  createSimpleEndpoint<project_kanban_cycle_card_comment>()({
    basePath: "/api/private/project_kanban_cycle_card_comment",
    routes: {
      store: "/api/private/project_kanban_cycle_card_comment/store",
      update: "/api/private/project_kanban_cycle_card_comment/update",
      destroy: "/api/private/project_kanban_cycle_card_comment/destroy",
    },
  });

export type ProjectKanbanCycleCardComment = project_kanban_cycle_card_comment;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardCommentStore = projectKanbanCycleCardCommentEndpoint.store;
export const projectKanbanCycleCardCommentUpdate = projectKanbanCycleCardCommentEndpoint.update;
export const projectKanbanCycleCardCommentDestroy = projectKanbanCycleCardCommentEndpoint.destroy;
