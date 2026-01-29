"use client";

import { useMemo, useState } from "react";

import { useLocale } from "next-intl";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { NumericFormat } from "react-number-format";

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
  PopoverContentInModal,
  PopoverTrigger,
} from "@repo/ui";
import { getAllCurrencies } from "@repo/utils/currency/service";
import { CurrencyInfo } from "@repo/utils/currency/types";

interface MoneyProps {
  value?: any;
  onChange?: (value?: any) => void;
  currency?: string;
  onCurrencyChange?: (currency: string) => void;
  className?: string;
  disabled?: boolean;
}

export const Money = ({
  value = null,
  currency,
  onChange,
  onCurrencyChange,
  className,
  disabled = false,
}: MoneyProps) => {
  const t = useLang();
  const locale = useLocale();

  const currencyData = useMemo(() => getAllCurrencies(locale), [locale]);
  const [open, setOpen] = useState(false);

  const handleCurrencyChange = (newCurrency: string) => {
    currency !== newCurrency && onCurrencyChange?.(newCurrency);
    setOpen(false);
  };

  const handleValueChange = (newValue: string | undefined) => {
    onChange?.(newValue);
  };

  const selectedCurrency = useMemo(() => {
    return currencyData.find((curr: CurrencyInfo) => curr.code === currency);
  }, [currencyData, currency]);

  return (
    <div
      className={cn(
        inputClassName,
        "flex items-center gap-0 p-0",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:shadow-md focus-within:ring-[3px]",
        className
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "border-border h-9 rounded-r-none border-0 border-r bg-transparent px-3 hover:bg-transparent focus:bg-transparent focus-visible:ring-0",
              disabled && "border-none"
            )}
          >
            <span className="flex items-center gap-0 text-left text-sm font-normal">
              {selectedCurrency?.symbol || currency}
            </span>
            {!disabled && <ChevronsUpDown className="text-muted-foreground ml-1 h-4 w-4" />}
          </Button>
        </PopoverTrigger>
        <PopoverContentInModal className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Buscar moeda..." maxLength={50} />
            <CommandList>
              <CommandEmpty>{t.helper("no_currency")}</CommandEmpty>
              <CommandGroup>
                {currencyData.map(({ code, name, symbol }: CurrencyInfo) => (
                  <CommandItem
                    key={code}
                    value={`${code} ${name} ${symbol}`}
                    onSelect={() => handleCurrencyChange(code)}
                  >
                    <div className="flex w-full items-center gap-2">
                      <span className="font-medium">{symbol}</span>
                      <span className="text-muted-foreground">- {name}</span>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          currency === code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentInModal>
      </Popover>

      <NumericFormat
        value={value}
        defaultValue={value}
        disabled={disabled}
        onValueChange={(values) => {
          const newValue = values.floatValue?.toString();
          value !== newValue && handleValueChange(newValue);
        }}
        placeholder="0"
        decimalSeparator={selectedCurrency?.decimalSeparator || ","}
        allowedDecimalSeparators={[selectedCurrency?.decimalSeparator || ","]}
        decimalScale={selectedCurrency?.decimal_digits || 2}
        thousandSeparator={selectedCurrency?.groupSeparator || "."}
        className={cn(
          "flex h-9 w-full min-w-0 rounded-l-none border-0 bg-transparent px-3 py-1 text-base outline-none",
          "placeholder:text-muted-foreground",
          "border-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        )}
      />
    </div>
  );
};
