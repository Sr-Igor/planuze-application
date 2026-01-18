'use client';

import { useMemo, useState } from 'react';

import { useLocale } from 'next-intl';

import { format } from 'date-fns';
import * as locations from 'date-fns/locale';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

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

export interface DaysOfMonthProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    days?: number;
    inputClassName?: string;
}

export function DaysOfMonth({
    value,
    onValueChange,
    placeholder,
    className,
    disabled = false,
    days = 31,
    inputClassName,
}: Readonly<DaysOfMonthProps>) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const t = useLang();
    const l = useLocale();

    const dateFnsLocale: any = l?.replaceAll('_', '')?.replaceAll('-', '') || 'en';
    // @ts-ignore
    const locale = locations?.[dateFnsLocale] || locations.enUS;

    const monthDays = useMemo(() => {
        return Array.from({ length: days }, (_, index) => {
            const dayNumber = index + 1;
            const formattedDay = format(new Date(2023, 0, dayNumber), 'dd', { locale });

            return {
                value: dayNumber.toString(),
                label: formattedDay,
                dayNumber: dayNumber.toString(),
                dayNumberPadded: dayNumber.toString().padStart(2, '0'),
            };
        });
    }, [days, locale]);

    const filteredMonthDays = useMemo(() => {
        if (!searchValue.trim()) {
            return monthDays;
        }

        const searchLower = searchValue.toLowerCase().trim();

        return monthDays.filter((day) => {
            // Search by day number (1-31)
            if (day.dayNumber.includes(searchLower)) {
                return true;
            }

            // Search by day number with leading zero (01-31)
            if (day.dayNumberPadded.includes(searchLower)) {
                return true;
            }

            // Search by full text
            if (day.label.toLowerCase().includes(searchLower)) {
                return true;
            }

            return false;
        });
    }, [monthDays, searchValue]);

    const selectedDay = useMemo(() => {
        return monthDays.find((day) => day.value === value);
    }, [value, monthDays]);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleSelect = (currentValue: string) => {
        onValueChange?.(currentValue === value ? '' : currentValue);
        setOpen(false);
        setSearchValue('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between disabled:hover:bg-transparent', className, inputClassName)}
                    disabled={disabled}
                >
                    <span className={cn(!selectedDay && 'text-muted-foreground')}>
                        {selectedDay ? selectedDay.label : placeholder || t.helper('select_a_day_of_month')}
                    </span>
                    {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={t.helper('search_for_a_day_of_month')}
                        className="h-9"
                        value={searchValue}
                        onValueChange={handleSearchChange}
                    />
                    <CommandList className="max-h-[300px]">
                        <CommandEmpty>
                            <p className="text-muted-foreground text-sm">{t.helper('day_of_month_not_found')}</p>
                        </CommandEmpty>
                        <CommandGroup>
                            {filteredMonthDays.map((day) => (
                                <CommandItem key={day.value} value={day.value} onSelect={handleSelect}>
                                    {day.label}
                                    <CheckIcon
                                        className={cn('mr-2 h-4 w-4', value === day.value ? 'opacity-100' : 'opacity-0')}
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
