"use client";

import { NumericFormat } from "react-number-format";

import { Input } from "@repo/ui";

interface PercentageProps {
  value?: any;
  onChange?: (value?: any) => void;
  className?: string;
  disabled?: boolean;
}

export const Percentage = ({
  value = null,
  onChange,
  className,
  disabled = false,
}: PercentageProps) => {
  const handleValueChange = (newValue: string | undefined) => {
    onChange?.(newValue);
  };

  return (
    <NumericFormat
      value={value}
      defaultValue={value}
      disabled={disabled}
      onValueChange={(values) => {
        const newValue = values.floatValue?.toString();
        value !== newValue && handleValueChange(newValue);
      }}
      placeholder="0%"
      suffix="%"
      decimalSeparator="."
      allowedDecimalSeparators={["."]}
      decimalScale={10}
      customInput={Input}
      className={className}
      isAllowed={(values) => {
        const { floatValue, value: stringValue } = values;

        // Bloquear sinal de menos
        if (stringValue && stringValue.includes("-")) {
          return false;
        }

        // Verificar se é positivo (não permitir valores negativos)
        if (floatValue !== undefined && floatValue < 0) {
          return false;
        }

        return true;
      }}
    />
  );
};
