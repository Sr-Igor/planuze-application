import type { client_address } from "@repo/types";

import {
  useNestedField,
  type UseNestedFieldReturn,
} from "../../../application/hooks/use-nested-field.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientAddressEndpoint } from "../endpoints/client_address";

/**
 * Hook for Client Address operations (nested field in client)
 */
export const useClientAddress = (
  props: UseCallerProps<client_address>
): UseNestedFieldReturn<client_address> => {
  const { filters, id, callbacks } = props;

  return useNestedField<client_address>({
    endpoint: clientAddressEndpoint,
    rootCacheKeys: cacheKeys.client,
    field: "client_address",
    accessKey: filters?.client_id as string,
    id,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
    },
  });
};
