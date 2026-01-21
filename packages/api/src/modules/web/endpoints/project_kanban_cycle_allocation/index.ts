import type { Prisma, project_kanban_cycle_allocation } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

/**
 * Default query for project kanban cycle allocation
 */
export const projectKanbanCycleAllocationQuery: {
  include: Prisma.project_kanban_cycle_allocationInclude;
} = {
  include: {
    logs,
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
    project_member: true,
  },
};

/**
 * Project Kanban Cycle Allocation endpoint
 */
export const projectKanbanCycleAllocationEndpoint =
  createSimpleEndpoint<project_kanban_cycle_allocation>()({
    basePath: "/api/private/project_kanban_cycle_allocation",
    routes: {
      index: "/api/private/project_kanban_cycle_allocation/index",
      store: "/api/private/project_kanban_cycle_allocation/store",
      update: "/api/private/project_kanban_cycle_allocation/update",
      destroy: "/api/private/project_kanban_cycle_allocation/destroy",
      trash: "/api/private/project_kanban_cycle_allocation/trash",
      restore: "/api/private/project_kanban_cycle_allocation/restore",
    },
    additionalIncludes: projectKanbanCycleAllocationQuery.include,
  });

export type ProjectKanbanCycleAllocation = project_kanban_cycle_allocation;

// Direct function exports for backwards compatibility
export const projectKanbanCycleAllocationIndex = projectKanbanCycleAllocationEndpoint.index;
export const projectKanbanCycleAllocationStore = projectKanbanCycleAllocationEndpoint.store;
export const projectKanbanCycleAllocationUpdate = projectKanbanCycleAllocationEndpoint.update;
export const projectKanbanCycleAllocationDestroy = projectKanbanCycleAllocationEndpoint.destroy;
export const projectKanbanCycleAllocationTrash = projectKanbanCycleAllocationEndpoint.trash;
export const projectKanbanCycleAllocationRestore = projectKanbanCycleAllocationEndpoint.restore;
