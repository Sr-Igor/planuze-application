import type { project_kanban_cycle_card } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const projectKanbanCycleCardEndpoint = createSimpleEndpoint<project_kanban_cycle_card>()({
  basePath: "/api/private/project_kanban_cycle_card",
  routes: {
    index: "/api/private/project_kanban_cycle_card/index",
    show: "/api/private/project_kanban_cycle_card/show",
    store: "/api/private/project_kanban_cycle_card/store",
    update: "/api/private/project_kanban_cycle_card/update",
    destroy: "/api/private/project_kanban_cycle_card/destroy",
    many: "/api/private/project_kanban_cycle_card/many",
    trash: "/api/private/project_kanban_cycle_card/trash",
    restore: "/api/private/project_kanban_cycle_card/restore",
  },
});

export type ProjectKanbanCycleCard = project_kanban_cycle_card;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardIndex = projectKanbanCycleCardEndpoint.index;
export const projectKanbanCycleCardShow = projectKanbanCycleCardEndpoint.show;
export const projectKanbanCycleCardStore = projectKanbanCycleCardEndpoint.store;
export const projectKanbanCycleCardUpdate = projectKanbanCycleCardEndpoint.update;
export const projectKanbanCycleCardDestroy = projectKanbanCycleCardEndpoint.destroy;
export const projectKanbanCycleCardMany = projectKanbanCycleCardEndpoint.many;
export const projectKanbanCycleCardTrash = projectKanbanCycleCardEndpoint.trash;
export const projectKanbanCycleCardRestore = projectKanbanCycleCardEndpoint.restore;
