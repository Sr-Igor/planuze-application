import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { Pagination } from '@/types/pagination';
import { useMutation, useQuery } from '@tanstack/react-query';

import { CacheKeyFunction, CacheKeys } from '../use-base/types';
import { IUseInsertProps, IUseInsertReturn } from './types';

export type { IUseInsertProps, IUseInsertReturn };

export function useInsert<T, K extends CacheKeys = CacheKeys>({
    callbacks,
    filters,
    enabledIndex,
    id,
    enableTrash,
    cache: cacheKey,
    placeholder,
    api,
    enabledShow
}: IUseInsertProps<T, K>): IUseInsertReturn<T> {
    const cacheConfig = keys[cacheKey] as Record<string, CacheKeyFunction>;

    const indexKey = cacheConfig.index?.(filters) || [];
    const showKey = cacheConfig.show?.(id) || [];
    const trashKey = cacheConfig.trash?.(filters) || [];

    const hasIndexReturn = filters?.return;

    const cache = useCache();

    const index = useQuery<Pagination<T>, Error>({
        queryKey: indexKey,
        queryFn: () => {
            if (!api.index) throw new Error(`API index method not implemented for cache key: ${String(cacheKey)}`);
            return api.index({ ...filters, return: undefined });
        },
        enabled: !!enabledIndex,
        placeholderData: placeholder
    });

    const show = useQuery<T, Error>({
        queryKey: showKey,
        queryFn: () => {
            if (!api.show) throw new Error(`API show method not implemented for cache key: ${String(cacheKey)}`);
            return api.show(id!);
        },
        enabled: !!enabledShow
    });

    const showMutation = useMutation<T, Error, string>({
        mutationFn: (ref: string) => {
            if (!api.show) throw new Error(`API show method not implemented for cache key: ${String(cacheKey)}`);
            return api.show(ref);
        },
        onSuccess: (e) => {
            cache.replaceShow({ key: showKey, item: e });
        }
    });

    const store = useMutation({
        mutationFn: (body: Partial<T>) => {
            if (!api.store) throw new Error(`API store method not implemented for cache key: ${String(cacheKey)}`);

            return api.store(body, filters);
        },
        onSuccess: (e) => {
            if (!hasIndexReturn) {
                cache.insertInIndex({ key: indexKey, item: e });
            } else {
                cache.replaceIndex({ key: indexKey, data: e as Pagination<T> });
            }

            callbacks?.store?.onSuccess?.(e);
        },
        onError: callbacks?.store?.onError
    });

    const update = useMutation({
        mutationFn: (body: Partial<T>) => {
            if (!api.update) throw new Error(`API update method not implemented for cache key: ${String(cacheKey)}`);
            if (!id) throw new Error('ID is required for update operation');
            return api.update(id, body, filters);
        },
        onSuccess: (e) => {
            if (!hasIndexReturn) {
                cache.updateInIndex({ key: indexKey, item: e });
                cache.replaceShow({ key: showKey, item: e });
            } else {
                cache.replaceIndex({ key: indexKey, data: e as Pagination<T> });
            }

            callbacks?.update?.onSuccess?.(e);
        },
        onError: callbacks?.update?.onError
    });

    const destroy = useMutation({
        mutationFn: () => {
            if (!api.destroy) throw new Error(`API destroy method not implemented for cache key: ${String(cacheKey)}`);
            if (!id) throw new Error('ID is required for destroy operation');
            return api.destroy(id, filters);
        },
        onSuccess: (e) => {
            if (!hasIndexReturn) {
                cache.destroyInIndex({ key: indexKey, item: e });
                cache.insertInIndex({ key: trashKey, item: e });
            } else {
                cache.replaceIndex({ key: indexKey, data: e as Pagination<T> });
            }
            callbacks?.destroy?.onSuccess?.(e);
        },
        onError: callbacks?.destroy?.onError
    });

    const trash = useQuery<Pagination<T>, Error>({
        queryKey: trashKey,
        queryFn: () => {
            if (!api.trash) throw new Error(`API trash method not implemented for cache key: ${String(cacheKey)}`);
            return api.trash({ ...filters, return: undefined });
        },
        enabled: !!enableTrash
    });

    const restore = useMutation({
        mutationFn: (itemId?: string) => {
            if (!api.restore) throw new Error(`API restore method not implemented for cache key: ${String(cacheKey)}`);
            if (!itemId && !id) throw new Error('Item ID or ID is required for restore operation');
            return api.restore(itemId! || id!, filters);
        },
        onSuccess: (e) => {
            if (!hasIndexReturn) {
                cache.insertInIndex({ key: indexKey, item: e });
                cache.destroyInIndex({ key: trashKey, item: e });
            } else {
                cache.replaceIndex({ key: indexKey, data: e as Pagination<T> });
                cache.invalidateIndex(trashKey);
            }
            callbacks?.restore?.onSuccess?.(e);
        },
        onError: callbacks?.restore?.onError
    });

    return {
        store,
        show: api.show ? show : undefined,
        index,
        update,
        destroy,
        trash,
        restore,
        showMutation: api.show ? showMutation : undefined
    };
}
