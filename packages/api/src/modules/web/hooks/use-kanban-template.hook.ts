import type { kanban_template } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateEndpoint } from "../endpoints/kanban_template";

/**
 * Hook for Kanban Template CRUD operations
 */
export const useKanbanTemplate = (
  props: UseCallerProps<kanban_template>
): UseCrudReturn<kanban_template> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<kanban_template>({
    endpoint: kanbanTemplateEndpoint as any,
    cacheKeys: cacheKeys.kanban_template,
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
