import type { project_kanban_cycle_card_comment } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanCycleCardCommentEndpoint } from "../endpoints/project_kanban_cycle_card_comment";

/**
 * Hook for Project Kanban Cycle Card Comment operations (nested in card)
 *
 * Matches old-project behavior: comments are added at the beginning of the array
 * (no specific ordering needed - newest first is the default)
 */
export const useProjectKanbanCycleCardComment = (
  props: UseCallerProps<project_kanban_cycle_card_comment>
): UseNestedArrayReturn<project_kanban_cycle_card_comment> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<project_kanban_cycle_card_comment>({
    endpoint: projectKanbanCycleCardCommentEndpoint as any,
    cacheKeys: cacheKeys.project_kanban_cycle_card_comment,
    rootCacheKeys: cacheKeys.project_kanban_cycle_card,
    field: "project_kanban_cycle_card_comments",
    accessKey: filters?.project_kanban_cycle_card_id as string,
    id,
    filters,
    enableTrash,
    // No nestedArrayOptions needed - comments are added at the beginning (newest first)
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
