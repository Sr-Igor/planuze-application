import type { project_kanban_cycle_allocation } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleAllocationEndpoint } from "../endpoints/project_kanban_cycle_allocation";

/**
 * Hook for Project Kanban Cycle Allocation operations
 */
export const useProjectKanbanCycleAllocation = (
  props: UseCallerProps<project_kanban_cycle_allocation>
): UseInsertReturn<project_kanban_cycle_allocation> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_kanban_cycle_allocation>({
    endpoint: projectKanbanCycleAllocationEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_cycle_allocation,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
