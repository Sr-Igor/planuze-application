import type { project_member } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectMemberPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectMemberEndpoint } from "../endpoints/project_member";

/**
 * Hook for Project Member operations
 */
export const useProjectMember = (
  props: UseCallerProps<project_member>
): UseInsertReturn<project_member> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_member>({
    endpoint: projectMemberEndpoint as any,
    cacheKeys: cacheKeys.project_member,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectMemberPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
