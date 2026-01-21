import type { kanban_template_column } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateColumnEndpoint } from "../endpoints/kanban_template_column";

/**
 * Hook for Kanban Template Column operations (nested in template)
 */
export const useKanbanTemplateColumn = (
  props: UseCallerProps<kanban_template_column>
): UseNestedArrayReturn<kanban_template_column> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<kanban_template_column>({
    endpoint: kanbanTemplateColumnEndpoint as any,
    cacheKeys: cacheKeys.kanban_template_column,
    rootCacheKeys: cacheKeys.kanban_template,
    field: "kanban_template_columns",
    accessKey: filters?.kanban_template_id as string,
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
