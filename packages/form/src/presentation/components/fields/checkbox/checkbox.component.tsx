'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Checkbox } from './checkbox-export.component';

export function CheckboxField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> & React.DetailedHTMLProps<any, any>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer className={className} name={name} error={fieldState.error?.message} {...rest}>
                    <Checkbox
                        checked={field.value}
                        {...rest}
                        required={false}
                        tabIndex={-1}
                        className={cn('text-foreground h-8 w-8', inputClassName)}
                        iconClassName="size-6"
                        onCheckedChange={field.onChange as (value: boolean) => void}
                    />
                </FieldContainer>
            )}
        />
    );
}
