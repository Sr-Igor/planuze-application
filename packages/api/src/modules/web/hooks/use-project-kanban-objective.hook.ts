import type { project_kanban_objective } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanObjectiveEndpoint } from "../endpoints/project_kanban_objective";

/**
 * Hook for Project Kanban Objective operations
 *
 * Matches old-project behavior: uses `useBase` which invalidates cache and refetches after mutations.
 * This is equivalent to `useCrud` in the new architecture.
 */
export const useProjectKanbanObjective = (
  props: UseCallerProps<project_kanban_objective>
): UseCrudReturn<project_kanban_objective> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<project_kanban_objective>({
    endpoint: projectKanbanObjectiveEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_objective,
    id,
    filters,
    enabled: {
      index: enabledIndex,
      show: enabledShow,
      trash: enableTrash,
    },
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      many: callbacks?.many,
      restore: callbacks?.restore,
    },
  });
};
