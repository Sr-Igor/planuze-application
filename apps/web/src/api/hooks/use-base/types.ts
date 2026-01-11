import keys from '@/api/cache/keys';
import { IUseCallerProps } from '@/api/types';
import { Pagination, Query } from '@/types/pagination';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type CacheKeys = keyof typeof keys;

export type CacheKeyFunction = (cache?: any) => string[];

export interface Api<T> {
    index?: (filters?: Query & Record<string, any>) => Promise<Pagination<T>>;
    show?: (id: string, filters?: Query & Record<string, any>) => Promise<T>;
    store?: (body: Partial<T>, filters?: Query & Record<string, any>) => Promise<T | Pagination<T>>;
    update?: (id: string, body: Partial<T>, filters?: Query & Record<string, any>) => Promise<T | Pagination<T>>;
    destroy?: (id: string, filters?: Query & Record<string, any>) => Promise<Pagination<T> | T>;
    many?: (
        ids: string,
        body: { deleted?: boolean } & Record<string, any>,
        filters?: Query & Record<string, any>
    ) => Promise<Pagination<T> | T[]>;
    trash?: (filters?: Query & Record<string, any>) => Promise<Pagination<T>>;
    restore?: (id: string, filters?: Query & Record<string, any>) => Promise<Pagination<T> | T>;
}

export interface IUseBaseProps<T, K extends CacheKeys = CacheKeys> extends IUseCallerProps<T> {
    api: Api<T>;
    cache: K;
    placeholder?: Pagination<T>;
}

export interface IUseBaseReturn<T> {
    store: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
    show: UseQueryResult<T, Error>;
    index: UseQueryResult<Pagination<T>, Error>;
    update: UseMutationResult<T | Pagination<T>, Error, Partial<T>>;
    destroy: UseMutationResult<Pagination<T> | T, Error, void>;
    many: UseMutationResult<
        Pagination<T> | T[],
        Error,
        { ids: string; body: { deleted?: boolean } & Record<string, any> }
    >;
    trash: UseQueryResult<Pagination<T>, Error>;
    restore: UseMutationResult<Pagination<T> | T, Error, void | string>;
}
