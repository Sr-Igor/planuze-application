'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Bank } from './bank-export.component';

export function BankField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    changeCallback,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Bank
                        value={field.value || ''}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        changeCallback={changeCallback}
                        className={cn('text-foreground', inputClassName)}
                        disabled={rest.disabled}
                    />
                </FieldContainer>
            )}
        />
    );
}
