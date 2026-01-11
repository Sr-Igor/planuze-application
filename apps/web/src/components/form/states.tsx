"use client";

import * as React from "react";

import { CheckIcon, ChevronsUpDown, LoaderCircle, Plus } from "lucide-react";

import { useLang } from "@repo/language/hook";
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
} from "@repo/ui";

import { useStates } from "@/api/callers/states";
import { cn } from "@/lib/utils";

export interface IStateProps {
  value: string;
  onChange: (value: string) => void;
  country?: string;
  className?: string;
  required?: boolean;
  tabIndex?: number;
  disabled?: boolean;
}

export function States({ value, onChange, className, country, disabled = false }: IStateProps) {
  const t = useLang();

  const input = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);

  const index = useStates(country);
  const data = index.data || [];

  const selected = data.find((state) => state.value?.toLowerCase() === value?.toLowerCase()) || {
    label: value,
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between disabled:hover:bg-transparent", className)}
        >
          <span
            className={cn(
              "flex items-center gap-0 text-left text-sm font-normal",
              !value ? "text-muted-foreground" : "capitalize"
            )}
          >
            {value ? selected?.label || value : t.helper("select_a_state")}
          </span>

          <span className="text-muted-foreground pointer-events-none flex items-center gap-1">
            {index.isLoading && <LoaderCircle className="animate-spin" size={20} />}
            <ChevronsUpDown className={cn("text-muted-foreground", disabled && "opacity-0!")} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <span className="relative p-2">
            <CommandInput
              ref={input}
              maxLength={50}
              placeholder={t.helper("search") + "..."}
              style={{ width: "calc(100% - 3rem)" }}
            />
            <span
              className="absolute top-2 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80"
              key={`manual--search`}
              onClick={() => {
                onChange(input.current?.value || "");
                setOpen(false);
              }}
            >
              <Plus className="h-4 w-4" />
            </span>
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
              <CommandEmpty className="text-center text-xs">{t.helper("no_results")}</CommandEmpty>
            )}

            <CommandGroup>
              {data.map((country) => (
                <CommandItem
                  key={`${country.label}-${country.value}`}
                  value={country.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    onChange(newValue);
                    setOpen(false);
                  }}
                >
                  {country.label}
                  <CheckIcon
                    className={cn("ml-auto", value === country.value ? "opacity-100" : "opacity-0")}
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
