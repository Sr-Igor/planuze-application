import type { client_contact } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientContactEndpoint } from "../endpoints/client_contact";

/**
 * Hook for Client Contact operations (nested array in client)
 */
export const useClientContact = (
  props: UseCallerProps<client_contact>
): UseNestedArrayReturn<client_contact> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<client_contact>({
    endpoint: clientContactEndpoint,
    cacheKeys: cacheKeys.client_contact,
    rootCacheKeys: cacheKeys.client,
    field: "client_contacts",
    accessKey: filters?.client_id as string,
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
