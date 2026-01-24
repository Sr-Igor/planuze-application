import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { company_config } from "@repo/types";

import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyConfigEndpoint } from "../endpoints/company_config";

/**
 * Return type for useCompanyConfig hook
 */
export interface UseCompanyConfigReturn {
  show: UseQueryResult<company_config, Error>;
  store: UseMutationResult<company_config, Error, Partial<company_config>>;
  update: UseMutationResult<company_config, Error, Partial<company_config>>;
}

/**
 * Hook for Company Config operations
 */
export const useCompanyConfig = (props: UseCallerProps<company_config>): UseCompanyConfigReturn => {
  const { id, enabledShow, callbacks } = props;

  const cache = useCache();
  const showKey = cacheKeys.company_config.show({});

  const show = useQuery<company_config, Error>({
    queryKey: showKey,
    queryFn: () => companyConfigEndpoint.show(""),
    enabled: !!enabledShow,
  });

  const store = useMutation<company_config, Error, Partial<company_config>>({
    mutationFn: (body) => companyConfigEndpoint.store(body) as Promise<company_config>,
    onSuccess: (data) => {
      cache.replaceShow({ key: showKey, item: data });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<company_config, Error, Partial<company_config>>({
    mutationFn: (body) => companyConfigEndpoint.update(id!, body) as Promise<company_config>,
    onSuccess: (data) => {
      cache.replaceShow({ key: showKey, item: data });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return { show, store, update };
};
