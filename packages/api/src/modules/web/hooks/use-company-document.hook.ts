import type { company_document } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyDocumentEndpoint } from "../endpoints/company_document";

/**
 * Hook for Company Document operations (nested array in company)
 */
export const useCompanyDocument = (
  props: UseCallerProps<company_document>
): UseNestedArrayReturn<company_document> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<company_document>({
    endpoint: companyDocumentEndpoint,
    cacheKeys: cacheKeys.company_document,
    rootCacheKeys: cacheKeys.company,
    field: "company_documents",
    accessKey: filters?.company_id as string,
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
