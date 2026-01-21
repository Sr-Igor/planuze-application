import type { project_kanban_objective } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanObjectiveEndpoint = createSimpleEndpoint<project_kanban_objective>()({
  basePath: "/api/private/project_kanban_objective",
  routes: {
    index: "/api/private/project_kanban_objective/index",
    store: "/api/private/project_kanban_objective/store",
    update: "/api/private/project_kanban_objective/update",
    destroy: "/api/private/project_kanban_objective/destroy",
    many: "/api/private/project_kanban_objective/many",
  },
});

export type ProjectKanbanObjective = project_kanban_objective;

// Direct function exports for backwards compatibility
export const projectKanbanObjectiveIndex = projectKanbanObjectiveEndpoint.index;
export const projectKanbanObjectiveStore = projectKanbanObjectiveEndpoint.store;
export const projectKanbanObjectiveUpdate = projectKanbanObjectiveEndpoint.update;
export const projectKanbanObjectiveDestroy = projectKanbanObjectiveEndpoint.destroy;
export const projectKanbanObjectiveMany = projectKanbanObjectiveEndpoint.many;
