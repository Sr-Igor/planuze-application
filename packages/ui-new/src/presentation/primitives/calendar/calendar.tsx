/**
 * Calendar Component Module
 *
 * A date picker calendar component.
 *
 * @module presentation/primitives/calendar
 */

"use client";

import { format, Locale } from "date-fns";
import * as allLocales from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../../shared/utils";
import { Button, ButtonProps } from "../button";

const locales: Record<string, Locale> = allLocales;

/**
 * Navigation button for next month.
 */
function NextMonthButton(props: ButtonProps) {
  return (
    <Button {...props} variant="ghost" size="icon" className="hover:bg-transparent">
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
}

/**
 * Navigation button for previous month.
 */
function PreviousMonthButton(props: ButtonProps) {
  return (
    <Button {...props} variant="ghost" size="icon" className="hover:bg-transparent">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}

/**
 * Day button component.
 */
function DayButton(props: ButtonProps & { modifiers: { selected?: boolean } }) {
  const { modifiers, ...buttonProps } = props;
  const isSelected = modifiers.selected;
  return (
    <Button
      {...buttonProps}
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 p-0 font-normal",
        isSelected
          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          : "hover:bg-transparent hover:text-current"
      )}
    />
  );
}

/**
 * Gets the date-fns locale based on the locale string.
 */
function getDynamicDateFnsLocale(locale: string): Locale {
  const camelCaseKey = locale.replace(/-(\w)/, (_, letter) => letter.toUpperCase());
  const shortKey = locale.split("-")[0];

  if (locales[camelCaseKey]) {
    return locales[camelCaseKey];
  }
  if (locales[shortKey]) {
    return locales[shortKey];
  }

  return locales.enUS;
}

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  /**
   * Locale string for date formatting (e.g., "en-US", "pt-BR").
   * @default "en-US"
   */
  localeString?: string;
};

/**
 * Calendar component.
 *
 * A date picker calendar based on react-day-picker.
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 * ```
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  localeString = "en-US",
  ...props
}: CalendarProps) {
  const dateFnsLocale = getDynamicDateFnsLocale(localeString);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={dateFnsLocale}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption_label: "text-sm font-medium first-letter:uppercase",
        month_caption: "h-10 flex items-center justify-start",
        nav: "space-x-1 flex items-center h-10 absolute right-0",
        nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-50 text-foreground"),
        nav_button_previous: "absolute left-1 text-foreground",
        nav_button_next: "absolute right-1 text-foreground",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20"
        ),
        weekday: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground font-bold text-sm"
        ),
        ...classNames,
      }}
      components={{
        NextMonthButton,
        PreviousMonthButton,
        DayButton,
      }}
      formatters={{
        formatWeekdayName: (day) => format(day, "EEEEE", { locale: dateFnsLocale }).toUpperCase(),
      }}
      {...props}
    />
  );
}

export { Calendar };
