import type { project_tool } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectToolPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectToolEndpoint } from "../endpoints/project_tool";

/**
 * Hook for Project Tool operations
 */
export const useProjectTool = (
  props: UseCallerProps<project_tool>
): UseInsertReturn<project_tool> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_tool>({
    endpoint: projectToolEndpoint as any,
    cacheKeys: cacheKeys.project_tool,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectToolPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
