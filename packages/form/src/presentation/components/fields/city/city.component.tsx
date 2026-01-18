'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Cities } from './city-export.component';

export function CityField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    country,
    state,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        country?: string;
        state?: string;
    }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Cities
                        value={field.value || ''}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        country={country}
                        state={state}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                    />
                </FieldContainer>
            )}
        />
    );
}
