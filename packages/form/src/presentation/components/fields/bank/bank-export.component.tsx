'use client';

import * as React from 'react';

import { CheckIcon, ChevronsUpDown, LoaderCircle } from 'lucide-react';

import { useLang } from '@repo/language/hook';
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    cn,
} from '@repo/ui';

import { useBank } from '@repo/api/web/callers/bank';
import { IBank } from '@repo/api/global/bank';

export interface IBankProps {
    value: string;
    onChange: (value: string) => void;
    changeCallback?: (bank: IBank | null) => void;
    className?: string;
    disabled?: boolean;
}

export function Bank({ value, onChange, className, disabled = false, changeCallback }: Readonly<IBankProps>) {
    const t = useLang();

    const input = React.useRef<HTMLInputElement>(null);

    const [open, setOpen] = React.useState(false);

    const index = useBank();
    const data: IBank[] = Array.isArray(index?.data) ? index.data : [];

    const selected = data.find((bank: IBank) => bank?.value?.toString() === value?.toString()) || {
        label: value,
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn('w-full justify-between disabled:hover:bg-transparent', className)}
                >
                    <span
                        className={cn(
                            'flex items-center gap-0 text-left text-sm font-normal',
                            value ? '' : 'text-muted-foreground'
                        )}
                    >
                        {value ? selected?.label || value : t.helper('select_a_bank')}
                    </span>

                    <span className="text-muted-foreground pointer-events-none flex items-center gap-1">
                        {index.isLoading && <LoaderCircle className="animate-spin" size={20} />}
                        <ChevronsUpDown className={cn('text-muted-foreground', disabled && 'opacity-0!')} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                <Command>
                    <span className="relative p-2">
                        <CommandInput
                            ref={input}
                            maxLength={50}
                            placeholder={t.helper('search') + '...'}
                            style={{ width: 'calc(100% - 3rem)' }}
                        />
                    </span>
                    <CommandList
                        onWheel={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {index.isLoading && (
                            <span className="flex w-full items-center justify-center p-4">
                                <LoaderCircle className="animate-spin" size={20} />
                            </span>
                        )}

                        {!index.isLoading && data.length === 0 && (
                            <CommandEmpty className="text-center text-xs">{t.helper('no_results')}</CommandEmpty>
                        )}
                        <CommandGroup>
                            {data.map((bank: IBank) => (
                                <CommandItem
                                    key={`${bank.label}-${bank.value}`}
                                    value={bank.value}
                                    onSelect={() => {
                                        onChange(
                                            bank.value?.toString() === value?.toString()
                                                ? ''
                                                : bank.value?.toString() || ''
                                        );
                                        changeCallback?.(bank.value?.toString() === value?.toString() ? null : bank);
                                        setOpen(false);
                                    }}
                                >
                                    {bank.label}
                                    <CheckIcon
                                        className={cn('ml-auto', value === bank.value ? 'opacity-100' : 'opacity-0')}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
