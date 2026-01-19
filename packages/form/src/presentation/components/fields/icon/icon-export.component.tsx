'use client';

import * as React from 'react';

import * as icons from 'lucide-react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { FixedSizeList, FixedSizeList as List } from 'react-window';

import { useLang } from '@repo/language/hooks';
import {
    Button,
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    Popover,
    PopoverContentInModal,
    PopoverTrigger,
    cn,
} from '@repo/ui';
import { Icon } from '@repo/ui';

export interface IIconProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

export function Icons({ value, onChange, className, disabled = false }: Readonly<IIconProps>) {
    const t = useLang();

    const input = React.useRef<HTMLInputElement>(null);

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const data = React.useMemo(() => {
        return Object.keys(icons)
            .filter((icon) => icon !== 'icons' && icon !== 'createLucideIcon')
            .map((icon) => ({
                label: icon,
                value: icon,
            }));
    }, []);

    const filteredData = React.useMemo(() => {
        if (!search) return data;
        return data.filter((icon) => icon.label.toLowerCase().includes(search.toLowerCase()));
    }, [data, search]);

    const selected = data.find((icon) => icon.value?.toLowerCase() === value?.toLowerCase()) || {
        label: value,
    };

    const listRef = React.useRef<FixedSizeList>(null);

    interface RowProps {
        index: number;
        style: React.CSSProperties;
    }

    const Row = React.useCallback(
        ({ index, style }: RowProps) => {
            const icon = filteredData[index];
            if (!icon) return null;
            return (
                <div style={{ ...style, display: 'flex', alignItems: 'center', height: 36 }}>
                    <CommandItem
                        key={`${icon.label}-${icon.value}`}
                        value={icon.value}
                        onSelect={(currentValue) => {
                            onChange(currentValue === value ? '' : currentValue);
                            setOpen(false);
                        }}
                        className="w-full"
                    >
                        <Icon name={icon.value} className="mr-2" />
                        <span className="line-clamp-1 truncate text-sm font-normal capitalize">{icon.label}</span>
                        <CheckIcon className={cn('ml-auto', value === icon.value ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                </div>
            );
        },
        [filteredData, onChange, setOpen, value]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn('w-full justify-between disabled:hover:bg-transparent', className)}
                >
                    <span
                        className={cn(
                            'line-clamp-1 flex min-w-0 items-center truncate text-left text-sm font-normal capitalize'
                        )}
                    >
                        <Icon name={selected?.label} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{selected?.label || t.helper('select_a_icon')}</span>
                    </span>

                    <span className="text-muted-foreground pointer-events-none flex items-center gap-1">
                        <ChevronsUpDown className="text-muted-foreground" />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContentInModal
                className="w-(--radix-popover-trigger-width) p-0"
                style={{ maxHeight: 300, minWidth: 250, overflow: 'visible' }}
            >
                <Command>
                    <CommandInput
                        ref={input}
                        maxLength={50}
                        placeholder={t.helper('search_a_icon') + '...'}
                        value={search}
                        onValueChange={setSearch}
                    />
                    {filteredData.length === 0 ? (
                        <CommandEmpty>{t.helper('not_found_icon')}</CommandEmpty>
                    ) : (
                        <List
                            ref={listRef}
                            height={280}
                            itemCount={filteredData.length}
                            itemSize={36}
                            width={'100%'}
                            style={{ outline: 'none', width: '100%' }}
                        >
                            {Row}
                        </List>
                    )}
                </Command>
            </PopoverContentInModal>
        </Popover>
    );
}
