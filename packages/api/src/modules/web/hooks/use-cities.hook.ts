import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { getCities, type ICity } from "../../../shared/services/location/cities.service";

/**
 * Hook for fetching cities list by country and state
 */
export const useCities = (country?: string, state?: string): UseQueryResult<ICity[], Error> => {
  return useQuery<ICity[], Error>({
    queryKey: cacheKeys.cities.index(`${country}-${state}`),
    queryFn: () => getCities(country!, state!),
    enabled: !!country && !!state,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
