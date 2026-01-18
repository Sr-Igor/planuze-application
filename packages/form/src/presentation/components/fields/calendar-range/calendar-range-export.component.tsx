'use client';

import { useCallback, useEffect, useState } from 'react';

import { differenceInDays, isAfter, isBefore } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { useLang } from '@repo/language/hook';
import {
    Button,
    Calendar as PickerCalendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    cn,
} from '@repo/ui';

import { useIntlFormat } from '@repo/hooks';

export interface ICalendarRangeProps {
    dateRange?: DateRange | null;
    setDateRange: (dateRange?: DateRange | null) => void;
    disabled?: boolean;
    disabledPast?: boolean;
    disabledFuture?: boolean;
    className?: string;
    placeholder?: string;
    minRange?: number;
    maxRange?: number;
}

export const CalendarRange = ({
    dateRange,
    setDateRange,
    disabled,
    disabledPast,
    disabledFuture,
    className,
    placeholder,
    minRange,
    maxRange,
}: ICalendarRangeProps) => {
    const [openPopover, setOpenPopover] = useState(false);
    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(undefined);

    const t = useLang();
    const { dates } = useIntlFormat();

    const validateRange = (range: DateRange | undefined) => {
        if (!range?.from || !range?.to) return true;

        const daysDifference = differenceInDays(range.to, range.from);

        if (minRange && daysDifference < minRange) return false;
        if (maxRange && daysDifference > maxRange) return false;

        return true;
    };

    const isRangeValid =
        tempDateRange?.from && tempDateRange?.to ? validateRange(tempDateRange) : true;
    const hasInvalidRange = tempDateRange?.from && tempDateRange?.to && !isRangeValid;

    const formatDateRange = (range: DateRange | null | undefined) => {
        if (!range?.from) return '';

        if (range.to) {
            return `${dates.formatDate(range.from)} - ${dates.formatDate(range.to)}`;
        }

        return dates.formatDate(range.from);
    };

    useEffect(() => {
        if (openPopover) {
            setTempDateRange(dateRange || undefined);
        }
    }, [openPopover, dateRange]);

    const handleDateSelect = (range: DateRange | undefined) => {
        setTempDateRange(range);
    };

    const handleApply = useCallback(() => {
        setDateRange(tempDateRange || null);
        setOpenPopover(false);
    }, [tempDateRange, setDateRange]);

    const handleClear = useCallback(() => {
        setTempDateRange(undefined);
        setDateRange(null);
        setOpenPopover(false);
    }, [setDateRange]);

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild disabled={disabled}>
                <div
                    tabIndex={disabled ? -1 : 0}
                    className={cn(
                        'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                        hasInvalidRange && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
                        'cursor-pointer justify-between font-normal',
                        disabled && 'cursor-not-allowed',
                        className
                    )}
                    aria-disabled={disabled}
                >
                    <span className={cn('text-foreground flex items-center gap-2')}>
                        <CalendarIcon className="text-muted-foreground" size={16} />
                        {dateRange?.from ? (
                            <span className="truncate">{formatDateRange(dateRange)}</span>
                        ) : (
                            <span className="text-muted-foreground">
                                {!disabled && (placeholder || t.helper('select_a_date_range'))}
                            </span>
                        )}
                    </span>
                </div>
            </PopoverTrigger>
            {!disabled && (
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="mt-2 mr-5 flex items-center justify-end">
                        <button className="text-[12px] text-red-500" onClick={handleClear}>
                            {t.helper('clear_selection')}
                        </button>
                    </div>
                    <PickerCalendar
                        mode="range"
                        selected={tempDateRange || undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            if (disabledPast && isBefore(date, today)) return true;
                            if (disabledFuture && isAfter(date, today)) return true;
                            return false;
                        }}
                        numberOfMonths={2}
                        className="rounded-md border"
                    />
                    <div className="border-border flex justify-end border-t p-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleApply}
                            className="flex items-center space-x-1"
                        >
                            <span>{t.helper('apply')}</span>
                        </Button>
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};
