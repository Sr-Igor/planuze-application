import type { project_kanban_cycle_card_file } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanCycleCardFileEndpoint =
  createSimpleEndpoint<project_kanban_cycle_card_file>()({
    basePath: "/api/private/project_kanban_cycle_card_file",
    routes: {
      store: "/api/private/project_kanban_cycle_card_file/store",
      update: "/api/private/project_kanban_cycle_card_file/update",
      destroy: "/api/private/project_kanban_cycle_card_file/destroy",
    },
    formDataFields: ["file"],
    defaultQuery: {
      include: { logs },
    },
  });

export type ProjectKanbanCycleCardFile = project_kanban_cycle_card_file;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardFileStore = projectKanbanCycleCardFileEndpoint.store;
export const projectKanbanCycleCardFileUpdate = projectKanbanCycleCardFileEndpoint.update;
export const projectKanbanCycleCardFileDestroy = projectKanbanCycleCardFileEndpoint.destroy;
