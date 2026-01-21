import type { profile_address } from "@repo/types";

import {
  useNestedField,
  type UseNestedFieldReturn,
} from "../../../application/hooks/use-nested-field.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileAddressEndpoint } from "../endpoints/profile_address";

/**
 * Hook for Profile Address operations (nested field in profile)
 */
export const useProfileAddress = (
  props: UseCallerProps<profile_address>
): UseNestedFieldReturn<profile_address> => {
  const { filters, id, callbacks } = props;

  return useNestedField<profile_address>({
    endpoint: profileAddressEndpoint,
    rootCacheKeys: cacheKeys.profile,
    field: "profile_address",
    accessKey: filters?.profile_id as string,
    id,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
    },
  });
};
