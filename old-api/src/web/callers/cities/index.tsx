import keys from "#/cache/keys";
import { getCities } from "#/global/cities";
import { useQuery } from "@tanstack/react-query";

export const useCities = (country?: string, state?: string) => {
  const index = useQuery({
    queryKey: keys.cities.index(`${country}-${state}`),
    queryFn: () => getCities(country!, state!),
    enabled: !!country && !!state,
  });

  return index;
};
