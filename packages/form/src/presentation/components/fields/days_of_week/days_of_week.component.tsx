'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '../../../../core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { DaysOfWeek } from './days_of_week-export.component';

export function DaysOfWeekField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <DaysOfWeek
                        value={field.value}
                        onValueChange={(value) => {
                            field.onChange(value);
                        }}
                        placeholder={rest.placeholder}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                    />
                </FieldContainer>
            )}
        />
    );
}
