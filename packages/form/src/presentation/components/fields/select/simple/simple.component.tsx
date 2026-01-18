'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../../base/container/field-container.component';
import { SimpleSelect } from './simple-export.component';
import { ISimpleSelectProps } from '#/shared/types/select.types';

export function SimpleSelectField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    options,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Omit<ISimpleSelectProps, 'value' | 'onChange'>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <SimpleSelect
                        {...rest}
                        options={options}
                        value={field.value}
                        onChange={(value, item) => {
                            field.onChange(value);
                        }}
                        className={cn('text-foreground', inputClassName)}
                    />
                </FieldContainer>
            )}
        />
    );
}
