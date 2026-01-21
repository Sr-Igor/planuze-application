import type { project_kanban_cycle_column } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanCycleColumnEndpoint = createSimpleEndpoint<project_kanban_cycle_column>()(
  {
    basePath: "/api/private/project_kanban_cycle_column",
    routes: {
      store: "/api/private/project_kanban_cycle_column/store",
      update: "/api/private/project_kanban_cycle_column/update",
      destroy: "/api/private/project_kanban_cycle_column/destroy",
      many: "/api/private/project_kanban_cycle_column/many",
      trash: "/api/private/project_kanban_cycle_column/trash",
      restore: "/api/private/project_kanban_cycle_column/restore",
    },
    defaultQuery: {
      include: { logs },
    },
  }
);

export type ProjectKanbanCycleColumn = project_kanban_cycle_column;

// Direct function exports for backwards compatibility
export const projectKanbanCycleColumnStore = projectKanbanCycleColumnEndpoint.store;
export const projectKanbanCycleColumnUpdate = projectKanbanCycleColumnEndpoint.update;
export const projectKanbanCycleColumnDestroy = projectKanbanCycleColumnEndpoint.destroy;
export const projectKanbanCycleColumnMany = projectKanbanCycleColumnEndpoint.many;
export const projectKanbanCycleColumnTrash = projectKanbanCycleColumnEndpoint.trash;
export const projectKanbanCycleColumnRestore = projectKanbanCycleColumnEndpoint.restore;
