import { useEffect } from 'react';

import keys from '@/api/cache/keys';
import { module } from '@/api/generator/types';
import * as api from '@/api/req/module';
import { useAuth } from '@/hooks/auth';
import { useAppDispatch } from '@/hooks/redux';
import { set } from '@/store/modules/module/actions';
import { Pagination } from '@/types/pagination';
import { useQuery } from '@tanstack/react-query';

export const useModule = () => {
    const { user, hasProfile, hasTwoAuth } = useAuth();

    const indexKey = keys.module.index(user?.id || 'unknown');
    const dispatch = useAppDispatch();

    const index = useQuery<Pagination<module>>({
        queryKey: indexKey,
        queryFn: () => (hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (index?.data?.data) dispatch(set({ all: index.data.data }));
    }, [index.data]);

    return { index };
};
