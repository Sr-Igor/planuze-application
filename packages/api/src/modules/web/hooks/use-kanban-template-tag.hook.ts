import type { kanban_template_tag } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateTagEndpoint } from "../endpoints/kanban_template_tag";

/**
 * Hook for Kanban Template Tag operations
 */
export const useKanbanTemplateTag = (
  props: UseCallerProps<kanban_template_tag>
): UseInsertReturn<kanban_template_tag> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<kanban_template_tag>({
    endpoint: kanbanTemplateTagEndpoint as any,
    cacheKeys: cacheKeys.kanban_template_tag,
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
