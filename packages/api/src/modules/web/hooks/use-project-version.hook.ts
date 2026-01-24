import type { project_version } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectVersionPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectVersionEndpoint } from "../endpoints/project_version";

/**
 * Hook for Project Version operations
 */
export const useProjectVersion = (
  props: UseCallerProps<project_version>
): UseInsertReturn<project_version> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_version>({
    endpoint: projectVersionEndpoint,
    cacheKeys: cacheKeys.project_version,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectVersionPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
