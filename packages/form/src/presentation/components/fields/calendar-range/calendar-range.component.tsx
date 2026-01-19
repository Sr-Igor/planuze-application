'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '../../../../core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { CalendarRange } from './calendar-range-export.component';

export function CalendarRangeField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    disabledPast,
    disabledFuture,
    placeholder,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        minRange?: number;
        maxRange?: number;
    }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <CalendarRange
                        dateRange={field.value}
                        setDateRange={(dateRange) => {
                            field.onChange(dateRange);
                        }}
                        disabled={rest.disabled}
                        disabledPast={disabledPast}
                        disabledFuture={disabledFuture}
                        placeholder={placeholder}
                        minRange={rest.minRange}
                        maxRange={rest.maxRange}
                        className={cn('text-foreground', inputClassName)}
                    />
                </FieldContainer>
            )}
        />
    );
}
