import type { project_kanban_cycle } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanCycleEndpoint = createSimpleEndpoint<project_kanban_cycle>()({
  basePath: "/api/private/project_kanban_cycle",
  routes: {
    index: "/api/private/project_kanban_cycle/index",
    show: "/api/private/project_kanban_cycle/show",
    store: "/api/private/project_kanban_cycle/store",
    update: "/api/private/project_kanban_cycle/update",
    destroy: "/api/private/project_kanban_cycle/destroy",
    many: "/api/private/project_kanban_cycle/many",
    trash: "/api/private/project_kanban_cycle/trash",
    restore: "/api/private/project_kanban_cycle/restore",
  },
});

export type ProjectKanbanCycle = project_kanban_cycle;

// Direct function exports for backwards compatibility
export const projectKanbanCycleIndex = projectKanbanCycleEndpoint.index;
export const projectKanbanCycleShow = projectKanbanCycleEndpoint.show;
export const projectKanbanCycleStore = projectKanbanCycleEndpoint.store;
export const projectKanbanCycleUpdate = projectKanbanCycleEndpoint.update;
export const projectKanbanCycleDestroy = projectKanbanCycleEndpoint.destroy;
export const projectKanbanCycleMany = projectKanbanCycleEndpoint.many;
export const projectKanbanCycleTrash = projectKanbanCycleEndpoint.trash;
export const projectKanbanCycleRestore = projectKanbanCycleEndpoint.restore;
