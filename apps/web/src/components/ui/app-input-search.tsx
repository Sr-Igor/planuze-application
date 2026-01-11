"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, ScrollArea } from "@repo/ui";

import { useDebounce } from "@repo/hooks/debounce";
import { cn } from "@/lib/utils";

import { Input } from "../form/input";

export interface AppInputSearchProps<T extends { id: string }> {
  data: T[];
  isLoading?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  placeholder?: string;
  dropdownHeight?: string;
  search: string;
  setSearch: (search: string) => void;
  optionChildren: (item: T) => React.ReactNode;
  alwaysOpen?: boolean;
  className?: string;
}

export const AppInputSearch = <T extends { id: string }>({
  data,
  width,
  dropdownHeight,
  isLoading,
  disabled,
  placeholder,
  search,
  setSearch,
  optionChildren,
  alwaysOpen = false,
  className,
}: AppInputSearchProps<T>) => {
  const t = useLang();

  const [value, setValue] = useState(search);
  const [focus, setFocus] = useState(false);

  const debouncedValue = useDebounce(value, 500);
  const isDebouncing = value !== debouncedValue;

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue]);

  const _WIDTH = width || `220px`;
  const _DROP_HEIGHT = dropdownHeight || `220px`;

  const currentWidth = focus || alwaysOpen ? _WIDTH : `46px`;

  const loading = isLoading || isDebouncing;
  const open = value && !loading && focus;

  return (
    <div
      className={cn("transition-all duration-300 ease-in-out", className)}
      style={{ width: currentWidth }}
    >
      <DropdownMenu open={true} modal={false}>
        <DropdownMenuTrigger
          disabled={true}
          className="w-full transition-all duration-300 ease-in-out"
        >
          <div className="relative flex w-full items-center gap-2">
            <Input
              icon="Search"
              iconClassName={cn(
                "pointer-events-none absolute top-1/2 left-1.5 -translate-y-1/2",
                (alwaysOpen || focus) && "left-0"
              )}
              id="searchable-dropdown"
              className={cn("w-full", "pl-8 transition-all duration-300", loading && "pr-8")}
              value={value}
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setTimeout(() => setFocus(false), 200);
              }}
              autoComplete="off"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              disabled={disabled}
            />
            <span
              className={cn(
                "pointer-events-none",
                "absolute right-2 opacity-0",
                "transition-all duration-300",
                loading && "opacity-100"
              )}
            >
              <Loader2 className="text-muted-foreground animate-spin" size={20} />
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          autoFocus={false}
          tabIndex={-1}
          className={cn(
            open ? `opacity-100` : "pointer-events-none h-0 opacity-0",
            "overflow-hidden",
            "transition-all duration-300"
          )}
          style={{ width: currentWidth }}
        >
          <ScrollArea className="relative flex w-full flex-col" style={{ maxHeight: _DROP_HEIGHT }}>
            {data?.map((item, index) => (
              <div key={index} className="hover:bg-primary/10 flex cursor-pointer! items-center">
                {optionChildren(item)}
              </div>
            ))}

            <p
              className={cn(
                "text-muted-foreground h-0 w-full text-sm opacity-0",
                !data.length && !loading && "h-auto opacity-100 transition-all duration-1000"
              )}
            >
              {t.helper("no_results")}
            </p>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
