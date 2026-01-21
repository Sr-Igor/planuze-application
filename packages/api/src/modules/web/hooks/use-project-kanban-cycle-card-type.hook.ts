import type { project_kanban_cycle_card_type } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleCardTypeEndpoint } from "../endpoints/project_kanban_cycle_card_type";

/**
 * Hook for Project Kanban Cycle Card Type operations (nested in cycle)
 */
export const useProjectKanbanCycleCardType = (
  props: UseCallerProps<project_kanban_cycle_card_type>
): UseNestedArrayReturn<project_kanban_cycle_card_type> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<project_kanban_cycle_card_type>({
    endpoint: projectKanbanCycleCardTypeEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_cycle_card_type,
    rootCacheKeys: cacheKeys.project_kanban_cycle,
    field: "project_kanban_cycle_card_types",
    accessKey: filters?.project_kanban_cycle_id as string,
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
