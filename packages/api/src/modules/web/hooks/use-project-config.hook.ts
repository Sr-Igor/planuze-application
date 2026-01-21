import type { project_config } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectConfigPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectConfigEndpoint } from "../endpoints/project_config";

/**
 * Hook for Project Config operations
 */
export const useProjectConfig = (
  props: UseCallerProps<project_config>
): UseInsertReturn<project_config> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_config>({
    endpoint: projectConfigEndpoint as any,
    cacheKeys: cacheKeys.project_config,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectConfigPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
