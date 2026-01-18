'use client';

import { forwardRef, useMemo } from 'react';

import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { Input, cn } from '@repo/ui';

export interface PhoneProps {
    value?: string;
    onChange: (phone: string | null) => void;
    defaultCountry?: Country;
    className?: string;
    disabled?: boolean;
}

export function Phone({ value, onChange, className, defaultCountry = 'BR', disabled = false }: Readonly<PhoneProps>) {
    const handleChange = (phone?: string) => {
        onChange(phone || null);
    };

    const valueIncludePlus = useMemo(() => {
        if (!value) return undefined;

        return value.startsWith('+') ? value : `+${value}`;
    }, [value]);

    const CustomShadInput = useMemo(() => {
        return forwardRef<HTMLInputElement, React.ComponentProps<'input'>>((props, ref) => (
            <Input ref={ref} {...props} className={cn(props.className, className)} />
        ));
    }, [className]);

    return (
        <PhoneInput
            international
            defaultCountry={defaultCountry}
            value={valueIncludePlus}
            onChange={handleChange}
            inputComponent={CustomShadInput}
            disabled={disabled}
            countrySelectProps={{
                className: cn('h-full px-2 bg-transparent border-r border-input rounded-l-md'),
            }}
            className={cn('flex h-9 items-center rounded-md border bg-transparent', className)}
            withCountryCallingCode
            smartCaret={false}
        />
    );
}
