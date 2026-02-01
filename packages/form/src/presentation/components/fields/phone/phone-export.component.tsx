"use client";

import { forwardRef, useMemo } from "react";

import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn, Input, inputClassName } from "@repo/ui";

export interface PhoneProps {
  value?: string;
  onChange: (phone: string | null) => void;
  defaultCountry?: Country;
  className?: string;
  disabled?: boolean;
}

export function Phone({
  value,
  onChange,
  className,
  defaultCountry = "BR",
  disabled = false,
}: Readonly<PhoneProps>) {
  const handleChange = (phone?: string) => {
    onChange(phone || null);
  };

  const valueIncludePlus = useMemo(() => {
    if (!value) return undefined;

    return value.startsWith("+") ? value : `+${value}`;
  }, [value]);

  const CustomShadInput = useMemo(() => {
    return forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => (
      <Input
        ref={ref}
        {...props}
        className={cn(
          "flex h-9 w-full min-w-0 rounded-l-none border-0 bg-transparent px-3 py-1 text-base shadow-none outline-none",
          "placeholder:text-muted-foreground",
          "border-transparent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // Remove disabled:pointer-events-none to allow focus propagation if needed, or keep it
          "focus-visible:ring-0",
          props.className
        )}
      />
    ));
  }, []);

  return (
    <PhoneInput
      international
      defaultCountry={defaultCountry}
      value={valueIncludePlus}
      onChange={handleChange}
      inputComponent={CustomShadInput}
      disabled={disabled}
      countrySelectProps={{
        className: cn("h-full w-full opacity-0"),
      }}
      className={cn(
        inputClassName,
        "flex items-center gap-0 p-0",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:shadow-md focus-within:ring-[3px]",
        "[&_.PhoneInputCountry]:border-border [&_.PhoneInputCountry]:mr-0 [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:pr-3 [&_.PhoneInputCountry]:pl-3",
        disabled ? "[&_.PhoneInputCountry]:border-none" : "",
        className
      )}
      withCountryCallingCode
      smartCaret={false}
    />
  );
}
