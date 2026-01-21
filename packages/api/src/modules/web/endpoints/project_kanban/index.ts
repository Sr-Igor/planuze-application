import type { project_kanban } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanEndpoint = createSimpleEndpoint<project_kanban>()({
  basePath: "/api/private/project_kanban",
  routes: {
    index: "/api/private/project_kanban/index",
    show: "/api/private/project_kanban/show",
    store: "/api/private/project_kanban/store",
    update: "/api/private/project_kanban/update",
    destroy: "/api/private/project_kanban/destroy",
    many: "/api/private/project_kanban/many",
    trash: "/api/private/project_kanban/trash",
    restore: "/api/private/project_kanban/restore",
  },
});

export type ProjectKanban = project_kanban;

// Direct function exports for backwards compatibility
export const projectKanbanIndex = projectKanbanEndpoint.index;
export const projectKanbanShow = projectKanbanEndpoint.show;
export const projectKanbanStore = projectKanbanEndpoint.store;
export const projectKanbanUpdate = projectKanbanEndpoint.update;
export const projectKanbanDestroy = projectKanbanEndpoint.destroy;
export const projectKanbanMany = projectKanbanEndpoint.many;
export const projectKanbanTrash = projectKanbanEndpoint.trash;
export const projectKanbanRestore = projectKanbanEndpoint.restore;
