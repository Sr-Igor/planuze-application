import type { client_file } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientFileEndpoint } from "../endpoints/client_file";

/**
 * Hook for Client File operations (nested array in client)
 */
export const useClientFile = (
  props: UseCallerProps<client_file>
): UseNestedArrayReturn<client_file> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<client_file>({
    endpoint: clientFileEndpoint,
    cacheKeys: cacheKeys.client_file,
    rootCacheKeys: cacheKeys.client,
    field: "client_files",
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
