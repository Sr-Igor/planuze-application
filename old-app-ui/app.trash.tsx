'use client';

import React, { useMemo } from 'react';

import { useLang } from '@/hooks/language';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

import { AppTableActions } from './table';
import { TableAction } from './table/types';
import { isDate } from 'date-fns';
import { LoaderCircle, PackageOpen } from 'lucide-react';

export interface TrashProps<T extends Record<string, any>> {
    items: T[];
    actions?: TableAction<T & { id: string }>[];
    showKeys?: (keyof T)[];
    conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>;
    format?: Partial<Record<keyof T, (value: any, item: T) => any>>;
    loading?: boolean;
}

export const Trash = <T extends Record<string, any>>({
    items,
    actions = [],
    showKeys,
    conversor,
    format,
    loading
}: TrashProps<T>) => {
    const t = useLang();

    /* ------------------------------------------------------------------ */
    /* quais colunas mostrar -------------------------------------------- */
    const allKeys = useMemo(() => {
        if (!items.length) return [];
        const keys = Object.keys(items[0]) as (keyof T)[];
        if (showKeys?.length) {
            return showKeys.filter((k) => keys.includes(k));
        }

        return keys;
    }, [items, showKeys]);
    /* ------------------------------------------------------------------ */

    /* ------------------------------------------------------------------ */
    /* preparação do valor para exibição -------------------------------- */
    const prepareDisplay = (field: keyof T, raw: any, item: T): string => {
        let v = raw;

        /* 1. format ----------------------------------------------------- */
        if (format?.[field]) {
            try {
                v = format[field]!(v, item);
            } catch {
                /* se der erro, usa valor original */
            }
        }

        /* 2. conversor -------------------------------------------------- */
        if (conversor?.[field] && v != null) {
            const opts = conversor[field]!;
            const mapOne = (x: any) => opts.find((o) => String(o.value) === String(x))?.label ?? x;

            v = Array.isArray(v) ? opts.length && v.map(mapOne).join(', ') : mapOne(v);
        }

        /* 3. boolean ---------------------------------------------------- */
        if (typeof v === 'boolean') {
            return v ? t.helper('true') : t.helper('false');
        }

        /* 4. vazio ------------------------------------------------------ */
        if (v === null || v === undefined) {
            return '—';
        }

        /* 5. data ------------------------------------------------------- */
        if (isDate(v)) {
            return new Date(v).toLocaleString('pt-BR');
        }

        /* 6. objeto ----------------------------------------------------- */
        if (typeof v === 'object') {
            return JSON.stringify(v);
        }

        /* 7. fallback --------------------------------------------------- */
        return String(v);
    };
    /* ------------------------------------------------------------------ */

    return (
        <>
            {loading && (
                <Skeleton className='absolute h-full w-full'>
                    <div className={cn('absolute inset-0 flex items-center justify-center', loading ? '' : 'hidden')}>
                        <LoaderCircle className='animate-spin' size={20} />
                        {/* <p>{t.helper('restoring')}...</p> */}
                    </div>
                </Skeleton>
            )}

            {!!items.length && (
                <>
                    {/* Mobile: Cards */}
                    <div
                        className={cn(
                            'block space-y-3 p-2 transition-opacity duration-300 md:hidden',
                            loading ? 'pointer-events-none opacity-0' : 'opacity-100'
                        )}>
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className='flex flex-col gap-2 rounded-xl border border-gray-200 bg-neutral-50 p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80'>
                                {allKeys.map((key) => (
                                    <div key={String(key)} className='flex flex-col gap-0.5'>
                                        <span className='text-[11px] font-semibold text-gray-700 capitalize dark:text-gray-200'>
                                            {t.property(String(key))}
                                        </span>
                                        <span className='text-[12px] break-all text-gray-800 dark:text-gray-100'>
                                            {prepareDisplay(key, item[key], item)}
                                        </span>
                                    </div>
                                ))}
                                {actions.length > 0 && (
                                    <div className='mt-2 flex flex-wrap gap-2 border-t border-gray-100 pt-2 dark:border-neutral-800'>
                                        <AppTableActions<any> actions={actions} item={item} isLoading={false} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Tabela */}
                    <div
                        className={cn(
                            'hidden p-3 transition-opacity duration-300 md:block',
                            loading ? 'pointer-events-none opacity-0' : 'opacity-100'
                        )}>
                        <table className='min-w-full divide-y divide-gray-500 text-sm'>
                            <thead>
                                <tr>
                                    {allKeys.map((key) => (
                                        <th key={String(key)} className='px-4 py-2 text-left font-medium capitalize'>
                                            {t.property(String(key))}
                                        </th>
                                    ))}
                                    {actions.length > 0 && (
                                        <th className='px-4 py-2 text-center font-medium'>{t.helper('actions')}</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-400'>
                                {items.map((item, idx) => (
                                    <tr key={idx}>
                                        {allKeys.map((key) => (
                                            <td key={String(key)} className='px-4 py-2 capitalize'>
                                                {prepareDisplay(key, item[key], item)}
                                            </td>
                                        ))}

                                        {actions.length > 0 && (
                                            <td className='space-x-2 px-4 py-2 text-center'>
                                                <AppTableActions<any> actions={actions} item={item} isLoading={false} />
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {items.length === 0 && !loading && (
                <div className='absolute flex h-full w-full flex-col items-center justify-center'>
                    <PackageOpen size={60} className='text-muted-foreground' />
                    <div className='text-md text-center font-semibold text-gray-400 dark:text-gray-500'>
                        {t.helper('empty')}
                    </div>
                </div>
            )}
        </>
    );
};
