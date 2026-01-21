import type { company_file } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyFileEndpoint } from "../endpoints/company_file";

/**
 * Hook for Company File operations (nested array in company)
 */
export const useCompanyFile = (
  props: UseCallerProps<company_file>
): UseNestedArrayReturn<company_file> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<company_file>({
    endpoint: companyFileEndpoint,
    cacheKeys: cacheKeys.company_file,
    rootCacheKeys: cacheKeys.company,
    field: "company_files",
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
