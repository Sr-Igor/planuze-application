import type { profile_contact } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileContactEndpoint } from "../endpoints/profile_contact";

/**
 * Hook for Profile Contact operations (nested array in profile)
 */
export const useProfileContact = (
  props: UseCallerProps<profile_contact>
): UseNestedArrayReturn<profile_contact> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<profile_contact>({
    endpoint: profileContactEndpoint,
    cacheKeys: cacheKeys.profile_contact,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_contacts",
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
