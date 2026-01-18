'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Currency } from './currency-export.component';

export function CurrencyField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    showSelectedName = false,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        showSelectedName?: boolean;
    }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer className={className} name={name} error={fieldState.error?.message} {...rest}>
                    <Currency
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                        showSelectedName={showSelectedName}
                    />
                </FieldContainer>
            )}
        />
    );
}
