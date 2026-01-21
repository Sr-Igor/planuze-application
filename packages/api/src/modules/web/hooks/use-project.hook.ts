import type { project } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectEndpoint } from "../endpoints/project/project.endpoint";

/**
 * Hook for Project CRUD operations
 *
 * @example
 * ```tsx
 * const { index, show, store, update, destroy } = useProject({
 *   filters: { page: 1 },
 *   enabledIndex: true,
 *   id: projectId,
 *   enabledShow: !!projectId,
 * });
 * ```
 */
export const useProject = (props: UseCallerProps<project>): UseCrudReturn<project> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<project>({
    endpoint: projectEndpoint,
    cacheKeys: cacheKeys.project,
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
