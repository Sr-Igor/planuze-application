'use client';

import { useState } from 'react';

import { format, isAfter, isBefore } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { useLang } from '@repo/language/hook';
import { Calendar as PickerCalendar, Popover, PopoverContent, PopoverTrigger, cn } from '@repo/ui';

import { useIntlFormat } from '@repo/hooks';

export interface ICalendarProps {
    date?: Date | null;
    setDate: (date?: Date | null) => void;
    disabled?: boolean;
    disabledPast?: boolean;
    disabledFuture?: boolean;
    className?: string;
}

export const Calendar = ({
    date,
    setDate,
    disabled,
    disabledPast,
    disabledFuture,
    className,
}: ICalendarProps) => {
    const [openPopover, setOpenPopover] = useState(false);

    const t = useLang();
    const { dates } = useIntlFormat();

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild disabled={disabled}>
                <div
                    tabIndex={disabled ? -1 : 0}
                    data-disabled={disabled}
                    className={cn(
                        'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                        'cursor-pointer justify-between font-normal',
                        disabled && 'cursor-not-allowed',
                        className
                    )}
                    aria-disabled={disabled}
                >
                    <span className={cn('text-foreground flex items-center gap-2')}>
                        <CalendarIcon className={disabled ? 'opacity-30' : 'text-muted-foreground'} size={16} />
                        {date ? (
                            dates.formatDate(date)
                        ) : (
                            <span className="text-muted-foreground">
                                {!disabled && t.helper('select_a_date')}
                            </span>
                        )}
                    </span>
                </div>
            </PopoverTrigger>
            {!disabled && (
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="mt-2 mr-5 flex items-center justify-end">
                        <button
                            className="text-[12px] text-red-500"
                            onClick={() => {
                                setDate(null);
                                setOpenPopover(false);
                            }}
                        >
                            {t.helper('clear_selection')}
                        </button>
                    </div>
                    <PickerCalendar
                        mode="single"
                        selected={date ? new Date(date) : undefined}
                        onSelect={(date) => {
                            setDate(date);
                            setOpenPopover(false);
                        }}
                        disabled={(date) => {
                            if (disabledPast && isBefore(date, format(new Date(), 'yyyy-MM-dd'))) return true;
                            if (disabledFuture && isAfter(date, format(new Date(), 'yyyy-MM-dd HH:mm:ss')))
                                return true;
                            return false;
                        }}
                    />
                </PopoverContent>
            )}
        </Popover>
    );
};
