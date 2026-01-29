"use client";

import { useState } from "react";

import { format, isAfter, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useIntlFormat, useLang } from "@repo/language/hooks";
import {
  cn,
  inputClassName,
  Calendar as PickerCalendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";

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
            inputClassName,
            "cursor-pointer justify-between font-normal",
            disabled && "cursor-not-allowed",
            className
          )}
          aria-disabled={disabled}
        >
          <span className={cn("text-foreground flex items-center gap-2")}>
            <CalendarIcon className={disabled ? "opacity-30" : "text-muted-foreground"} size={16} />
            {date ? (
              dates.formatDate(date)
            ) : (
              <span className="text-muted-foreground">
                {!disabled && t.helper("select_a_date")}
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
              {t.helper("clear_selection")}
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
              if (disabledPast && isBefore(date, format(new Date(), "yyyy-MM-dd"))) return true;
              if (disabledFuture && isAfter(date, format(new Date(), "yyyy-MM-dd HH:mm:ss")))
                return true;
              return false;
            }}
          />
        </PopoverContent>
      )}
    </Popover>
  );
};
