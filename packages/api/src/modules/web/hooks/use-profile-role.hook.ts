import type { profile_role } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileRoleEndpoint } from "../endpoints/profile_role";

/**
 * Hook for Profile Role operations (nested array in profile)
 */
export const useProfileRole = (
  props: UseCallerProps<profile_role>
): UseNestedArrayReturn<profile_role> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<profile_role>({
    endpoint: profileRoleEndpoint,
    cacheKeys: cacheKeys.profile_role,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_roles",
    accessKey: filters?.profile_id as string,
    id,
    filters,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
