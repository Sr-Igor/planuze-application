import type { project_kanban_cycle_card } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

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
  defaultQuery: {
    include: {
      logs: {
        ...logs,
        orderBy: {
          createdAt: "asc",
        },
      },
      project_member: {
        select: {
          profile: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      },
      project_kanban_cycle_cards: {
        include: {
          project_kanban_cycle_card_type: true,
          project_kanban_cycle_column: true,
          project_kanban_cycle: true,
        },
      },
      project_kanban_cycle_card_comments: {
        include: {
          profile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      project_kanban_cycle_card_files: {
        include: {
          logs,
        },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
      work_type: true,
      card: {
        include: {
          project_kanban_cycle_card_type: true,
          project_kanban_cycle_column: true,
          project_kanban_cycle: true,
        },
      },
      profile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      project_kanban_cycle_card_tags: true,
      project_kanban_cycle_card_type: true,
      project_kanban_cycle_column: true,
      project_kanban_cycle: true,
      project_kanban_objective: true,
      project_kanban_objective_target: true,
      project_kanban_cycle_card_reads: {
        include: {
          profile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
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
