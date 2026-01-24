import type { project_kanban_objective_target } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanObjectiveTargetEndpoint =
  createSimpleEndpoint<project_kanban_objective_target>()({
    basePath: "/api/private/project_kanban_objective_target",
    routes: {
      index: "/api/private/project_kanban_objective_target/index",
      store: "/api/private/project_kanban_objective_target/store",
      update: "/api/private/project_kanban_objective_target/update",
      destroy: "/api/private/project_kanban_objective_target/destroy",
      trash: "/api/private/project_kanban_objective_target/trash",
      restore: "/api/private/project_kanban_objective_target/restore",
    },
    defaultQuery: {
      include: { logs },
    },
  });

export type ProjectKanbanObjectiveTarget = project_kanban_objective_target;

// Direct function exports for backwards compatibility
export const projectKanbanObjectiveTargetIndex = projectKanbanObjectiveTargetEndpoint.index;
export const projectKanbanObjectiveTargetStore = projectKanbanObjectiveTargetEndpoint.store;
export const projectKanbanObjectiveTargetUpdate = projectKanbanObjectiveTargetEndpoint.update;
export const projectKanbanObjectiveTargetDestroy = projectKanbanObjectiveTargetEndpoint.destroy;
