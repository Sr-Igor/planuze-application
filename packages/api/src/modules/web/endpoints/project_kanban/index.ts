import type { project_kanban } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanEndpoint = createSimpleEndpoint<project_kanban>()({
  basePath: "/api/private/project_kanban",
  routes: {
    index: "/api/private/project_kanban/index",
    show: "/api/private/project_kanban/show",
    store: "/api/private/project_kanban/store",
    destroy: "/api/private/project_kanban/destroy",
    many: "/api/private/project_kanban/many",
    trash: "/api/private/project_kanban/trash",
    restore: "/api/private/project_kanban/restore",
  },
  defaultQuery: {
    include: {
      logs,
      project: {
        select: {
          name: true,
        },
      },
      project_kanban_cycles: {
        include: {
          logs,
          work_type: true,
          project_kanban_cycle_columns: true,
          project_version: true,
          kanban_template: true,
        },
        orderBy: {
          order: "desc",
        },
      },
    },
  },
});

export type ProjectKanban = project_kanban;

// Direct function exports for backwards compatibility
export const projectKanbanIndex = projectKanbanEndpoint.index;
export const projectKanbanShow = projectKanbanEndpoint.show;
export const projectKanbanStore = projectKanbanEndpoint.store;
export const projectKanbanDestroy = projectKanbanEndpoint.destroy;
export const projectKanbanMany = projectKanbanEndpoint.many;
export const projectKanbanTrash = projectKanbanEndpoint.trash;
export const projectKanbanRestore = projectKanbanEndpoint.restore;
