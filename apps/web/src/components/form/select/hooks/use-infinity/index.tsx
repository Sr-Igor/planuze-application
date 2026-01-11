import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Pagination } from '@/types/pagination';
import { createId } from '@paralleldrive/cuid2';
import { useInfiniteQuery } from '@tanstack/react-query';

import { IOption, IUseInfinityProps } from '../../types';

export const useInfinity = <T,>({
    cacheKey,
    queryParams = {},
    searchParam = 'search',
    index: externalIndex = undefined,
    inputDebounced,
    limit = 10,
    request,
    formatter,
    value,
    enabled = true,
    open,
    enabledOnOpen = false
}: IUseInfinityProps<T>) => {
    const dataRef = useRef<IOption[]>([]);
    const randomUuid = useRef(createId());

    const index =
        externalIndex ||
        useInfiniteQuery<Pagination<T>>({
            queryKey: [cacheKey, randomUuid.current, { ...queryParams, [searchParam]: inputDebounced }],
            queryFn: ({ pageParam = 1 }) => {
                if (!request) throw new Error('Request is required');
                const params: Record<string, any> = { page: pageParam, limit, ...queryParams };
                if (inputDebounced) params[searchParam] = inputDebounced;
                return request?.(params);
            },
            getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined),
            initialPageParam: 1,
            enabled: enabled && (enabledOnOpen ? open : true)
        });

    const data = index.data?.pages.flatMap((page) => page.data) || [];

    const items = useMemo(() => {
        return formatter(data);
    }, [data, formatter]);

    useEffect(() => {
        setTimeout(() => {
            dataRef.current = items;
        }, 500);
    }, [items]);

    const selected = useMemo(() => {
        if (!value) return null;
        return items.find((item) => item.value === value);
    }, [items, value]);

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

            if (isAtBottom && index.hasNextPage && !index.isFetchingNextPage) {
                index.fetchNextPage();
            }
        },
        [index]
    );

    return {
        data,
        items: index.isLoading ? dataRef.current : items,
        selected,
        index,
        handleScroll
    };
};
