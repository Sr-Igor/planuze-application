import type { company_contact } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyContactEndpoint } from "../endpoints/company_contact";

/**
 * Hook for Company Contact operations (nested array in company)
 */
export const useCompanyContact = (
  props: UseCallerProps<company_contact>
): UseNestedArrayReturn<company_contact> => {
  const { filters, id, enableTrash, callbacks } = props;

  return useNestedArray<company_contact>({
    endpoint: companyContactEndpoint,
    cacheKeys: cacheKeys.company_contact,
    rootCacheKeys: cacheKeys.company,
    field: "company_contacts",
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
