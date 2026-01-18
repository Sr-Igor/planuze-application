'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useLang } from '@repo/language/hook';
import { Popover, PopoverTrigger, cn } from '@repo/ui';
import * as C from '@repo/ui';

import { useDebounce } from '@repo/hooks';

import {
    SelectContent,
    SelectEmpty,
    SelectItem,
    SelectList,
    SelectLoading,
    SelectSearch,
    SelectTrigger,
} from '../../../base/select';
import { useInfinity } from '../../../../hooks/select';
import { ISimpleInfinityProps } from '#/shared/types/select.types';

export const SimpleInfinitySelect = memo(function SimpleInfinitySelect<T>({
    value,
    onChange,
    onChangeCallback,
    className,
    placeholder,
    disabled = false,
    fallbackValue,
    formatterOptions,
    customSelect,
    immediatelyCallback,
    customTrigger,
    containerClassName,
    modal,
    search: externalSearch,
    setSearch: setExternalSearch,
    ...rest
}: ISimpleInfinityProps<T>) {
    const preSet = useRef(true);
    const t = useLang();

    const [open, setOpen] = useState(false);
    const [internalSearch, setInternalSearch] = useState('');

    const [pageSearch, setPageSearch] = useState('');

    const search = externalSearch || pageSearch;
    const setSearch = setExternalSearch || setPageSearch;

    const inputDebounced = useDebounce(internalSearch, 1000);
    const isDebouncing = internalSearch !== inputDebounced;

    useEffect(() => {
        setSearch?.(inputDebounced || '');
    }, [inputDebounced, setSearch]);

    const { index, items, selected, handleScroll } = useInfinity({
        ...rest,
        value,
        inputDebounced: search || '',
        open,
    });

    useEffect(() => {
        if (!value && immediatelyCallback && items.length > 0 && preSet.current) {
            preSet.current = false;
            immediatelyCallback?.(items[0].item);
        }
    }, [items, value, immediatelyCallback]);

    const handleSetSearch = useCallback(
        (newValue: string | null) => {
            setInternalSearch(newValue || '');
        },
        [setInternalSearch]
    );

    const handleClearAndClose = useCallback(() => {
        setInternalSearch('');
        onChange?.(null);
        onChangeCallback?.(null);
        setOpen(false);
    }, [setInternalSearch, onChange, onChangeCallback]);

    const handleItemSelect = useCallback(
        (itemValue: string, item: T) => {
            const newValue = itemValue === value ? null : itemValue;
            onChange?.(newValue);
            onChangeCallback?.(item);
            setOpen(false);
        },
        [value, onChange, onChangeCallback]
    );

    const deletedInfoFallback = index.isLoading ? ' ' : t.helper('deleted_info');

    const showValue = value
        ? customSelect?.(selected?.item, fallbackValue) ||
          selected?.label ||
          fallbackValue ||
          deletedInfoFallback
        : undefined;

    const isDeleted = showValue === t.helper('deleted_info');

    return (
        <Popover open={open} onOpenChange={setOpen} modal={modal}>
            <PopoverTrigger disabled={disabled} className={cn('w-full', disabled && 'pointer-events-none')}>
                {customTrigger && !isDeleted ? (
                    customTrigger({ disabled })
                ) : (
                    <SelectTrigger
                        placeholder={placeholder || t.helper('select')}
                        value={showValue}
                        className={className}
                        isDeleted={isDeleted}
                        disabled={disabled}
                    />
                )}
            </PopoverTrigger>
            <SelectContent className={containerClassName}>
                <C.Command shouldFilter={false}>
                    <SelectSearch
                        search={internalSearch}
                        setSearch={handleSetSearch}
                        onClear={handleClearAndClose}
                        placeholder={t.helper('search')}
                        useCommandInput={true}
                        loading={index.isLoading || isDebouncing}
                    />

                    <SelectList
                        onScroll={handleScroll}
                        useCommandList={true}
                        loading={(index.isLoading || isDebouncing) && !items?.length}
                    >
                        {!items.length && <SelectEmpty message={t.helper('no_results')} useCommandEmpty={true} />}

                        <C.CommandGroup>
                            {items.map((item) => (
                                <SelectItem
                                    key={`${item.value}-${item.label}`}
                                    value={item.value}
                                    label={item.label}
                                    checked={value === item.value}
                                    onSelect={() => handleItemSelect(item.value, item.item)}
                                    showCheckIcon={true}
                                    useCommandItem={true}
                                >
                                    {formatterOptions?.(item.item) || item.label}
                                </SelectItem>
                            ))}

                            {index.isFetchingNextPage && (
                                <SelectLoading
                                    size={16}
                                    text={t.helper('loading_more')}
                                    className="p-2"
                                    useLoaderCircle={true}
                                />
                            )}
                        </C.CommandGroup>
                    </SelectList>
                </C.Command>
            </SelectContent>
        </Popover>
    );
}) as <T>(props: ISimpleInfinityProps<T>) => React.JSX.Element;
