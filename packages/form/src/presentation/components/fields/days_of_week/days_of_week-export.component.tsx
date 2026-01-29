"use client";

import { useMemo, useState } from "react";

import { useLocale } from "next-intl";

import { format } from "date-fns";
import * as locations from "date-fns/locale";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  inputClassName as inputStyle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";

export interface DaysOfWeekProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
}

export function DaysOfWeek({
  value,
  onValueChange,
  placeholder,
  className,
  disabled = false,
  inputClassName,
}: Readonly<DaysOfWeekProps>) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const t = useLang();
  const l = useLocale();

  const dateFnsLocale: any = l?.replaceAll("_", "")?.replaceAll("-", "") || "en";
  // @ts-ignore
  const locale = locations?.[dateFnsLocale] || locations.enUS;

  const weekdays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const dayName = format(new Date(2023, 0, index + 1), "EEEE", { locale });
      return {
        value: index.toString(),
        label: dayName,
        dayName: dayName.toLowerCase(),
      };
    });
  }, [locale]);

  const filteredWeekdays = useMemo(() => {
    if (!searchValue.trim()) {
      return weekdays;
    }

    const searchLower = searchValue.toLowerCase().trim();

    return weekdays.filter((day) => {
      // Search by day name (full or partial)
      if (day.dayName.includes(searchLower)) {
        return true;
      }

      // Search by full text
      if (day.label.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search by day number (0-6)
      if (day.value.includes(searchLower)) {
        return true;
      }

      return false;
    });
  }, [weekdays, searchValue]);

  const selectedDay = useMemo(() => {
    return weekdays.find((day) => day.value === value);
  }, [value, weekdays]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (currentValue: string) => {
    onValueChange?.(currentValue === value ? "" : currentValue);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            inputStyle,
            "w-full [&>span.flex-1]:w-full [&>span.flex-1]:justify-between",
            selectedDay ? "capitalize" : "text-muted-foreground",
            className,
            inputClassName
          )}
          disabled={disabled}
        >
          <span className={cn(!selectedDay && "text-muted-foreground")}>
            {selectedDay ? selectedDay.label : placeholder || t.helper("select_a_day_of_week")}
          </span>
          {!disabled && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t.helper("search_for_a_day_of_week")}
            className="h-9"
            value={searchValue}
            onValueChange={handleSearchChange}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              <p className="text-muted-foreground text-sm">{t.helper("day_of_week_not_found")}</p>
            </CommandEmpty>
            <CommandGroup>
              {filteredWeekdays.map((day) => (
                <CommandItem
                  key={day.value}
                  value={day.value}
                  onSelect={handleSelect}
                  className="capitalize"
                >
                  {day.label}
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === day.value ? "opacity-100" : "opacity-0"
                    )}
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
