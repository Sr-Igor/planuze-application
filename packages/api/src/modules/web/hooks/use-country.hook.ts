import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { type Country, getCountries } from "../../../shared/services/location/countries.service";

/**
 * Hook for fetching countries
 */
export const useCountry = (): UseQueryResult<Country[], Error> => {
  return useQuery<Country[], Error>({
    queryKey: cacheKeys.country.index(),
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - countries don't change often
  });
};
