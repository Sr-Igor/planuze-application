import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { getBanks, type IBank } from "../../../shared/services/location/bank.service";

/**
 * Hook for fetching Brazilian banks list
 */
export const useBank = (): UseQueryResult<IBank[], Error> => {
  return useQuery<IBank[], Error>({
    queryKey: cacheKeys.bank.index(),
    queryFn: getBanks,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - banks don't change often
  });
};
