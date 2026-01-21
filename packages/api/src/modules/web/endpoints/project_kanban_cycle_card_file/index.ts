import type { project_kanban_cycle_card_file } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanCycleCardFileEndpoint =
  createSimpleEndpoint<project_kanban_cycle_card_file>()({
    basePath: "/api/private/project_kanban_cycle_card_file",
    routes: {
      store: "/api/private/project_kanban_cycle_card_file/store",
      update: "/api/private/project_kanban_cycle_card_file/update",
      destroy: "/api/private/project_kanban_cycle_card_file/destroy",
      trash: "/api/private/project_kanban_cycle_card_file/trash",
      restore: "/api/private/project_kanban_cycle_card_file/restore",
    },
    formDataFields: ["file"],
  });

export type ProjectKanbanCycleCardFile = project_kanban_cycle_card_file;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardFileStore = projectKanbanCycleCardFileEndpoint.store;
export const projectKanbanCycleCardFileUpdate = projectKanbanCycleCardFileEndpoint.update;
export const projectKanbanCycleCardFileDestroy = projectKanbanCycleCardFileEndpoint.destroy;
export const projectKanbanCycleCardFileTrash = projectKanbanCycleCardFileEndpoint.trash;
export const projectKanbanCycleCardFileRestore = projectKanbanCycleCardFileEndpoint.restore;
