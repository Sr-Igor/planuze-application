import type { client_document } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientDocumentEndpoint } from "../endpoints/client_document";

/**
 * Hook for Client Document operations (nested array in client)
 */
export const useClientDocument = (
  props: UseCallerProps<client_document>
): UseNestedArrayReturn<client_document> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<client_document>({
    endpoint: clientDocumentEndpoint,
    cacheKeys: cacheKeys.client_document,
    rootCacheKeys: cacheKeys.client,
    field: "client_documents",
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
