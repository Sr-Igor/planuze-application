import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '@repo/types';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useDebounce } from '@repo/hooks';

import { ITagsProps } from '#/shared/types/tags.types';

export function useTags<T>({
    cacheKey,
    formatter,
    request,
    queryParams,
    searchParam = 'search',
    limit,
    value,
}: Pick<ITagsProps<T>, 'cacheKey' | 'formatter' | 'request' | 'queryParams' | 'searchParam' | 'limit' | 'value'>) {
    const input = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputDebounced = useDebounce(searchTerm, 300);
    const isDebouncing = searchTerm !== inputDebounced;

    const index = useInfiniteQuery<Pagination<T>>({
        queryKey: [cacheKey, inputDebounced],
        queryFn: ({ pageParam = 1 }) => {
            const params: Record<string, any> = { page: pageParam, limit, ...queryParams };
            if (inputDebounced) params[searchParam] = inputDebounced;
            return request(params);
        },
        getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined),
        initialPageParam: 1,
        enabled: editing,
    });

    const data = index.data?.pages.flatMap((page) => page.data) ?? [];
    const items = useMemo(
        () =>
            formatter(data)?.filter(
                (item) =>
                    !value?.some(
                        (selectedItem) => selectedItem.title?.toLowerCase() === item.label?.toLowerCase()
                    )
            ) ?? [],
        [data, formatter, value]
    );

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

    useEffect(() => {
        if (editing && input.current) {
            setTimeout(() => {
                input.current?.focus();
            }, 0);
        }
    }, [editing]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!editing) return;

            const target = event.target as Node;
            const container = containerRef.current;

            if (container?.contains(target)) {
                return;
            }

            const commandList = document.querySelector('[cmdk-list]');
            const commandItem = document.querySelector('[cmdk-item]');
            const popoverContent = document.querySelector('[data-radix-popper-content-wrapper]');

            if (commandList?.contains(target)) {
                return;
            }

            if (commandItem?.contains(target)) {
                return;
            }

            if (popoverContent?.contains(target)) {
                return;
            }

            setEditing(false);
        };

        if (editing) {
            const timeoutId = setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [editing]);

    return {
        input,
        containerRef,
        editing,
        setEditing,
        searchTerm,
        setSearchTerm,
        isDebouncing,
        items,
        index,
        handleScroll,
    };
}
