import type { profile_file } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileFileEndpoint } from "../endpoints/profile_file";

/**
 * Hook for Profile File operations (nested array in profile)
 */
export const useProfileFile = (
  props: UseCallerProps<profile_file>
): UseNestedArrayReturn<profile_file> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<profile_file>({
    endpoint: profileFileEndpoint,
    cacheKeys: cacheKeys.profile_file,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_files",
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
