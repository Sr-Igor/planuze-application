"use client";

import * as React from "react";

import Image from "next/image";

import { CheckIcon, ChevronsUpDown, LoaderCircle, Plus } from "lucide-react";

import { useCountry } from "@repo/api/web";
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
  inputClassName,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";

export interface ICountryProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function Country({ value, onChange, className, disabled = false }: Readonly<ICountryProps>) {
  const t = useLang();

  const input = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);

  const index = useCountry();
  const data = Array.isArray(index?.data) ? index?.data : [];

  const selected = data?.find((country) => country?.name?.toString() === value?.toString()) || {
    name: value,
    flag: "",
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            inputClassName,
            "w-full disabled:hover:bg-transparent [&>span.flex-1]:w-full [&>span.flex-1]:justify-between",
            className
          )}
        >
          <span
            className={cn(
              "flex items-center gap-0 text-left text-sm font-normal",
              value ? "capitalize" : "text-muted-foreground"
            )}
          >
            {selected?.flag && (
              <Image
                src={selected.flag}
                alt={selected.name}
                width={20}
                height={20}
                className="mr-2 h-5 w-5 rounded-sm"
                loading="lazy"
                unoptimized
                priority={false}
              />
            )}
            {value ? selected?.name || value : t.helper("select_a_country")}
          </span>

          <ChevronsUpDown className={cn("text-muted-foreground", disabled && "opacity-0!")} />
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
            <button
              type="button"
              className="absolute top-2 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80"
              onClick={() => {
                onChange(input.current?.value || "");
                setOpen(false);
              }}
              aria-label={t.helper("add_manual_value")}
            >
              <Plus className="h-4 w-4" />
            </button>
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
                  key={`${country.code}-${country.name}`}
                  value={country.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {country?.flag && (
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={20}
                      height={20}
                      className="mr-2 h-5 w-5 rounded-sm"
                      loading="lazy"
                      unoptimized
                      priority={false}
                    />
                  )}
                  {country.name}
                  <CheckIcon
                    className={cn("ml-auto", value === country.name ? "opacity-100" : "opacity-0")}
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
