'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Cep } from './cep-export.component';

export function CepField<FormType extends FieldValues>({
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
                    <Cep
                        {...field}
                        {...rest}
                        required={false}
                        tabIndex={-1}
                        className={cn('text-foreground', inputClassName)}
                        onChange={(e) => {
                            field.onChange(e.target.value);
                        }}
                    />
                </FieldContainer>
            )}
        />
    );
}
