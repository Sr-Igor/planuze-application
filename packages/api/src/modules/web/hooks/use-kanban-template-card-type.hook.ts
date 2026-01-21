import type { kanban_template_card_type } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateCardTypeEndpoint } from "../endpoints/kanban_template_card_type";

/**
 * Hook for Kanban Template Card Type operations
 */
export const useKanbanTemplateCardType = (
  props: UseCallerProps<kanban_template_card_type>
): UseInsertReturn<kanban_template_card_type> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<kanban_template_card_type>({
    endpoint: kanbanTemplateCardTypeEndpoint as any,
    cacheKeys: cacheKeys.kanban_template_card_type,
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
