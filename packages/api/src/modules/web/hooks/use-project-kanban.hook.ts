import type { project_kanban } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectKanbanEndpoint } from "../endpoints/project_kanban";

/**
 * Hook for Project Kanban CRUD operations
 */
export const useProjectKanban = (
  props: UseCallerProps<project_kanban>
): UseCrudReturn<project_kanban> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<project_kanban>({
    endpoint: projectKanbanEndpoint as any,
    cacheKeys: cacheKeys.project_kanban,
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
