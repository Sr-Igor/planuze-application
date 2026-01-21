import type { project_kanban_objective } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanObjectiveEndpoint = createSimpleEndpoint<project_kanban_objective>()({
  basePath: "/api/private/project_kanban_objective",
  routes: {
    index: "/api/private/project_kanban_objective/index",
    show: "/api/private/project_kanban_objective/show",
    store: "/api/private/project_kanban_objective/store",
    update: "/api/private/project_kanban_objective/update",
    destroy: "/api/private/project_kanban_objective/destroy",
    many: "/api/private/project_kanban_objective/many",
    trash: "/api/private/project_kanban_objective/trash",
    restore: "/api/private/project_kanban_objective/restore",
  },
  defaultQuery: {
    include: {
      logs,
      project: {
        select: {
          name: true,
        },
      },
      project_kanban_objective_targets: {
        include: { logs },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  },
});

export type ProjectKanbanObjective = project_kanban_objective;

// Direct function exports for backwards compatibility
export const projectKanbanObjectiveIndex = projectKanbanObjectiveEndpoint.index;
export const projectKanbanObjectiveStore = projectKanbanObjectiveEndpoint.store;
export const projectKanbanObjectiveUpdate = projectKanbanObjectiveEndpoint.update;
export const projectKanbanObjectiveDestroy = projectKanbanObjectiveEndpoint.destroy;
export const projectKanbanObjectiveMany = projectKanbanObjectiveEndpoint.many;
