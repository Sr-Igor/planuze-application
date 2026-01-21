import type { project_kanban_cycle_card_file } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleCardFileEndpoint } from "../endpoints/project_kanban_cycle_card_file";

/**
 * Hook for Project Kanban Cycle Card File operations (nested in card)
 */
export const useProjectKanbanCycleCardFile = (
  props: UseCallerProps<project_kanban_cycle_card_file>
): UseNestedArrayReturn<project_kanban_cycle_card_file> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<project_kanban_cycle_card_file>({
    endpoint: projectKanbanCycleCardFileEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_cycle_card_file,
    rootCacheKeys: cacheKeys.project_kanban_cycle_card,
    field: "project_kanban_cycle_card_files",
    accessKey: filters?.project_kanban_cycle_card_id as string,
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
