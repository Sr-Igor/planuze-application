import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { getStates, type State } from "../../../shared/services/location/states.service";

/**
 * Hook for fetching states list by country
 */
export const useStates = (country?: string): UseQueryResult<State[], Error> => {
  return useQuery<State[], Error>({
    queryKey: cacheKeys.states.index(country),
    queryFn: () => getStates(country!),
    enabled: !!country,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
