'use client';

import { NumericFormat } from 'react-number-format';

import { inputClassName, cn } from '@repo/ui';

interface NumericProps {
    value?: any;
    placeholder?: string;
    onChange?: (value?: any) => void;
    className?: string;
    disabled?: boolean;
    maxValue?: number;
    int?: boolean;
    positive?: boolean;
}

export const Numeric = ({
    value = null,
    placeholder,
    onChange,
    className,
    disabled = false,
    maxValue,
    int = false,
    positive = false,
}: NumericProps) => {
    const handleValueChange = (newValue: string | undefined | null) => {
        onChange?.(newValue);
    };

    return (
        <NumericFormat
            value={value}
            disabled={disabled}
            data-disabled={disabled}
            onValueChange={(values) => {
                let newValue: string | undefined | null;

                if (int) {
                    newValue = values.value?.toString();
                } else {
                    newValue = values.floatValue?.toString();
                }

                if (value?.toString() !== newValue) handleValueChange(newValue || null);
            }}
            tabIndex={-1}
            placeholder={placeholder}
            decimalSeparator={int ? undefined : '.'}
            allowedDecimalSeparators={int ? [] : ['.']}
            decimalScale={int ? 0 : 10}
            className={cn(inputClassName, className)}
            isAllowed={(values) => {
                const { floatValue, value: stringValue } = values;

                // Block minus sign for integers
                if (int && stringValue?.includes('-')) {
                    return false;
                }

                // Check if positive (when positive=true)
                if (positive && floatValue !== undefined && floatValue < 0) {
                    return false;
                }

                // Check maximum value
                if (maxValue !== undefined && floatValue !== undefined) {
                    return floatValue <= maxValue;
                }

                return true;
            }}
        />
    );
};
