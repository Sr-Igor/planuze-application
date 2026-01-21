import type { project_allocation } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectAllocationPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectAllocationEndpoint } from "../endpoints/project_allocation";

/**
 * Hook for Project Allocation operations
 */
export const useProjectAllocation = (
  props: UseCallerProps<project_allocation>
): UseInsertReturn<project_allocation> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_allocation>({
    endpoint: projectAllocationEndpoint as any,
    cacheKeys: cacheKeys.project_allocation,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectAllocationPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
