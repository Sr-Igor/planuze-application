'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Money } from './money-export.component';

export function MoneyField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    currency,
    onCurrencyChange,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer className={className} name={name} error={fieldState.error?.message} {...rest}>
                    <Money
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        currency={currency}
                        onCurrencyChange={onCurrencyChange}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                    />
                </FieldContainer>
            )}
        />
    );
}
