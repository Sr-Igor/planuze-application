import type { company_address } from "@repo/types";

import {
  useNestedField,
  type UseNestedFieldReturn,
} from "../../../application/hooks/use-nested-field.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyAddressEndpoint } from "../endpoints/company_address";

/**
 * Hook for Company Address operations (nested field in company)
 */
export const useCompanyAddress = (
  props: UseCallerProps<company_address>
): UseNestedFieldReturn<company_address> => {
  const { filters, id, callbacks } = props;

  return useNestedField<company_address>({
    endpoint: companyAddressEndpoint,
    rootCacheKeys: cacheKeys.company,
    field: "company_address",
    accessKey: filters?.company_id as string,
    id,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
    },
  });
};
