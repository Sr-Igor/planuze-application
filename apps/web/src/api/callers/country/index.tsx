import keys from '@/api/cache/keys';
import { getCountries } from '@/api/global/countries';
import { useQuery } from '@tanstack/react-query';

export const useCountry = () => {
    const index = useQuery({
        queryKey: keys.country.index(),
        queryFn: getCountries
    });

    return index;
};
