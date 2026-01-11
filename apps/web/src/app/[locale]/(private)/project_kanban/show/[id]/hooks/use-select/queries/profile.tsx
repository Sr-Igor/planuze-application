import { profile } from '@/api/generator/types';
import { index } from '@/api/req/profile';
import { useAccess } from '@/hooks/access';
import { Pagination } from '@/types/pagination';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ISelectProps, ISelectReturnProps } from '../types';

export const useIndexProfile = ({ search }: ISelectProps): ISelectReturnProps => {
    const { permissions } = useAccess();
    const perm = permissions('profile');

    const queryParams = {
        limit: 10
    };

    const hash = { ...queryParams, search: search || undefined };

    const profiles = useInfiniteQuery<Pagination<profile>>({
        queryKey: ['kanban-selects-profile', hash],
        queryFn: ({ pageParam = 1 }) => {
            const params: Record<string, any> = { page: pageParam, ...queryParams };
            if (search) params.search = search;
            return index(params);
        },
        getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined),
        initialPageParam: 1,
        enabled: perm.index
    });

    return profiles;
};
