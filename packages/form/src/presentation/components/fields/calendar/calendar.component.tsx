'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '../../../../core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Calendar } from './calendar-export.component';

export function CalendarField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    disabledPast,
    disabledFuture,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Calendar
                        date={field.value}
                        setDate={(date) => {
                            field.onChange(date);
                        }}
                        disabled={rest.disabled}
                        disabledPast={disabledPast}
                        disabledFuture={disabledFuture}
                        className={cn('text-foreground', inputClassName)}
                    />
                </FieldContainer>
            )}
        />
    );
}
