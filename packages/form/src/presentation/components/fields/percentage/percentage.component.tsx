'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Percentage } from './percentage-export.component';

export function PercentageField<FormType extends FieldValues>({
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
                <FieldContainer className={className} name={name} error={fieldState.error?.message} {...rest}>
                    <Percentage
                        value={field.value}
                        className={cn('text-foreground', inputClassName)}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        {...rest}
                    />
                </FieldContainer>
            )}
        />
    );
}
