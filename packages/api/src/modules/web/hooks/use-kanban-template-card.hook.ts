import type { kanban_template_card } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateCardEndpoint } from "../endpoints/kanban_template_card";

/**
 * Hook for Kanban Template Card operations (nested in template)
 */
export const useKanbanTemplateCard = (
  props: UseCallerProps<kanban_template_card>
): UseNestedArrayReturn<kanban_template_card> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<kanban_template_card>({
    endpoint: kanbanTemplateCardEndpoint as any,
    cacheKeys: cacheKeys.kanban_template_card,
    rootCacheKeys: cacheKeys.kanban_template,
    field: "kanban_template_cards",
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
