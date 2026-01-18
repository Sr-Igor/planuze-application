'use client';

import { useMemo, useState } from 'react';

import { useLocale } from 'next-intl';

import { addDays, format, startOfYear } from 'date-fns';
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

export interface DaysOfYearProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    inputClassName?: string;
}

export function DaysOfYear({
    value,
    onValueChange,
    placeholder,
    className,
    disabled = false,
    inputClassName,
}: Readonly<DaysOfYearProps>) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const t = useLang();
    const l = useLocale();

    const dateFnsLocale: any = l?.replaceAll('_', '')?.replaceAll('-', '') || 'en';
    // @ts-ignore
    const locale = locations?.[dateFnsLocale] || locations.enUS;

    const daysOfYear = useMemo(() => {
        const days: Array<{
            value: string;
            label: string;
            date: Date;
            dayNumber: string;
            monthName: string;
        }> = [];

        const startDate = startOfYear(new Date('2024-01-01'));

        for (let i = 0; i < 365; i++) {
            const currentDate = addDays(startDate, i);
            const formattedDate = format(currentDate, 'MM/dd');

            const day = format(currentDate, 'dd', {
                locale,
            });

            const month = format(currentDate, 'MMMM', {
                locale,
            });

            days.push({
                value: formattedDate,
                label: `${day} ${t.helper('of')} ${month}`,
                date: currentDate,
                dayNumber: day,
                monthName: month,
            });
        }

        return days;
    }, [l, t, locale]);

    const filteredDays = useMemo(() => {
        if (!searchValue.trim()) {
            return daysOfYear;
        }

        const searchLower = searchValue.toLowerCase().trim();

        return daysOfYear.filter((day) => {
            // Search by day number
            if (day.dayNumber.includes(searchLower)) {
                return true;
            }

            // Search by month name (full or abbreviated)
            if (day.monthName.toLowerCase().includes(searchLower)) {
                return true;
            }

            // Search by full text
            if (day.label.toLowerCase().includes(searchLower)) {
                return true;
            }

            // Search by MM/dd format
            if (day.value.includes(searchLower)) {
                return true;
            }

            return false;
        });
    }, [daysOfYear, searchValue]);

    const selectedDay = useMemo(() => {
        return daysOfYear.find((day) => day.value === value);
    }, [value, daysOfYear]);

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
                    className={cn(
                        'w-full justify-between disabled:hover:bg-transparent',
                        !selectedDay && 'text-muted-foreground',
                        className,
                        inputClassName
                    )}
                    disabled={disabled}
                >
                    <span className={cn(!selectedDay && 'text-muted-foreground')}>
                        {selectedDay ? selectedDay.label : placeholder || t.helper('select_a_day_of_year')}
                    </span>
                    {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={t.helper('search_for_a_day')}
                        className="h-9"
                        value={searchValue}
                        onValueChange={handleSearchChange}
                    />
                    <CommandList className="max-h-[300px]">
                        <CommandEmpty>{t.helper('day_not_found')}</CommandEmpty>
                        <CommandGroup>
                            {filteredDays.map((day) => (
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
