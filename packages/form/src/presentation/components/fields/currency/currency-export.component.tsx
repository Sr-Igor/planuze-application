'use client';

import { useMemo, useState } from 'react';

import { useLocale } from 'next-intl';

import { CheckIcon, ChevronsUpDown } from 'lucide-react';

import { useLang } from '@repo/language/hooks';
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContentInModal,
    PopoverTrigger,
    cn,
} from '@repo/ui';

import { getAllCurrencies } from '@repo/utils/currency/service';
import { CurrencyInfo } from '@repo/utils/currency/types';

interface CurrencyProps {
    value?: any;
    onChange?: (value?: any) => void;
    className?: string;
    disabled?: boolean;
    showSelectedName?: boolean;
}

export const Currency = ({
    value = null,
    onChange,
    className,
    disabled = false,
    showSelectedName = false,
}: CurrencyProps) => {
    const t = useLang();
    const locale = useLocale();

    const currencyData = useMemo(() => getAllCurrencies(locale), [locale]);
    const [open, setOpen] = useState(false);

    const handleCurrencyChange = (newCurrency: string) => {
        value !== newCurrency && onChange?.(newCurrency);
        setOpen(false);
    };

    const selectedCurrency = useMemo(() => {
        return currencyData.find((curr: CurrencyInfo) => curr.code === value);
    }, [currencyData, value]);

    return (
        <div
            className={cn(
                'border-input flex items-center rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]',
                'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild disabled={disabled}>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn(
                            'border-border h-9 rounded-r-none border-0 border-r bg-transparent px-3 hover:bg-transparent focus:bg-transparent focus-visible:ring-0',
                            disabled && 'border-none'
                        )}
                    >
                        <span className="flex items-center gap-0 text-left text-sm font-normal">
                            {selectedCurrency?.symbol || value}
                            {showSelectedName && (
                                <span className="text-muted-foreground hidden md:block">
                                    {' '}
                                    - {selectedCurrency?.name || value}
                                </span>
                            )}
                        </span>
                        {!disabled && <ChevronsUpDown className="text-muted-foreground ml-1 h-4 w-4" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContentInModal className="w-80 p-0">
                    <Command>
                        <CommandInput placeholder="Buscar moeda..." maxLength={50} />
                        <CommandList>
                            <CommandEmpty>{t.helper('no_currency')}</CommandEmpty>
                            <CommandGroup>
                                {currencyData.map(({ code, name, symbol }: CurrencyInfo) => (
                                    <CommandItem
                                        key={code}
                                        value={`${code} ${name} ${symbol}`}
                                        onSelect={() => handleCurrencyChange(code)}
                                    >
                                        <div className="flex w-full items-center gap-2">
                                            <span className="font-medium">{symbol}</span>
                                            <span className="text-muted-foreground">- {name}</span>
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    value === code ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContentInModal>
            </Popover>
        </div>
    );
};
