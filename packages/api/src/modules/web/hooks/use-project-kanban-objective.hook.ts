import type { project_kanban_objective } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanObjectiveEndpoint } from "../endpoints/project_kanban_objective";

/**
 * Hook for Project Kanban Objective operations
 */
export const useProjectKanbanObjective = (
  props: UseCallerProps<project_kanban_objective>
): UseInsertReturn<project_kanban_objective> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_kanban_objective>({
    endpoint: projectKanbanObjectiveEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_objective,
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
