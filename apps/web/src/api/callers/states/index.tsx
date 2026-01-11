import keys from '@/api/cache/keys';
import { getStates } from '@/api/global/states';
import { useQuery } from '@tanstack/react-query';

export const useStates = (country?: string) => {
    const index = useQuery({
        queryKey: keys.state.index(country),
        queryFn: () => getStates(country!),
        enabled: !!country
    });

    return index;
};
