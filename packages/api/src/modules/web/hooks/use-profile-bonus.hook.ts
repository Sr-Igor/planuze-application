import type { profile_bonus } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileBonusEndpoint } from "../endpoints/profile_bonus";

/**
 * Hook for Profile Bonus operations (nested array in profile)
 */
export const useProfileBonus = (
  props: UseCallerProps<profile_bonus>
): UseNestedArrayReturn<profile_bonus> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<profile_bonus>({
    endpoint: profileBonusEndpoint,
    cacheKeys: cacheKeys.profile_bonus,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_bonus",
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
