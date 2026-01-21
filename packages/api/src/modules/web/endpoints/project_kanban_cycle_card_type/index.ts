import type { project_kanban_cycle_card_type } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectKanbanCycleCardTypeEndpoint =
  createSimpleEndpoint<project_kanban_cycle_card_type>()({
    basePath: "/api/private/project_kanban_cycle_card_type",
    routes: {
      index: "/api/private/project_kanban_cycle_card_type/index",
      store: "/api/private/project_kanban_cycle_card_type/store",
      update: "/api/private/project_kanban_cycle_card_type/update",
      destroy: "/api/private/project_kanban_cycle_card_type/destroy",
      trash: "/api/private/project_kanban_cycle_card_type/trash",
      restore: "/api/private/project_kanban_cycle_card_type/restore",
      many: "/api/private/project_kanban_cycle_card_type/many",
    },
    defaultQuery: {
      include: { logs },
    },
  });

export type ProjectKanbanCycleCardType = project_kanban_cycle_card_type;

// Direct function exports for backwards compatibility
export const projectKanbanCycleCardTypeStore = projectKanbanCycleCardTypeEndpoint.store;
export const projectKanbanCycleCardTypeUpdate = projectKanbanCycleCardTypeEndpoint.update;
export const projectKanbanCycleCardTypeDestroy = projectKanbanCycleCardTypeEndpoint.destroy;
export const projectKanbanCycleCardTypeMany = projectKanbanCycleCardTypeEndpoint.many;
