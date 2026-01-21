import type { project_kanban_objective_target } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanObjectiveTargetEndpoint } from "../endpoints/project_kanban_objective_target";

/**
 * Hook for Project Kanban Objective Target operations (nested in objective)
 */
export const useProjectKanbanObjectiveTarget = (
  props: UseCallerProps<project_kanban_objective_target>
): UseNestedArrayReturn<project_kanban_objective_target> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<project_kanban_objective_target>({
    endpoint: projectKanbanObjectiveTargetEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_objective_target,
    rootCacheKeys: cacheKeys.project_kanban_objective,
    field: "project_kanban_objective_targets",
    accessKey: filters?.project_kanban_objective_id as string,
    id,
    filters,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
