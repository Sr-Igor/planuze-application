import type { profile_document } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileDocumentEndpoint } from "../endpoints/profile_document";

/**
 * Hook for Profile Document operations (nested array in profile)
 */
export const useProfileDocument = (
  props: UseCallerProps<profile_document>
): UseNestedArrayReturn<profile_document> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<profile_document>({
    endpoint: profileDocumentEndpoint,
    cacheKeys: cacheKeys.profile_document,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_documents",
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
