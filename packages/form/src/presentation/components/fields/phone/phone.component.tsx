'use client';

import { Controller, FieldValues } from 'react-hook-form';
import { Country } from 'react-phone-number-input';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Phone } from './phone-export.component';

export function PhoneField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    defaultCountry = 'BR',
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        defaultCountry?: Country;
    }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Phone
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        defaultCountry={defaultCountry}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                    />
                </FieldContainer>
            )}
        />
    );
}
