import keys from "#/cache/keys";
import { getCountries } from "#/global/countries";
import { useQuery } from "@tanstack/react-query";

export const useCountry = () => {
  const index = useQuery({
    queryKey: keys.country.index(),
    queryFn: getCountries,
  });

  return index;
};
