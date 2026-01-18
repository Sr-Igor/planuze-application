'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';
import { StatusCircle } from '@repo/ui/app';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Switch } from './switch-export.component';

export function SwitchField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    read,
    ...rest
}: IFieldComponentProps<FormType> & React.DetailedHTMLProps<any, any>) {
    const isOnlyRead = read === 'true';

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer className={className} name={name} error={fieldState.error?.message} {...rest}>
                    {!isOnlyRead && (
                        <Switch
                            checked={field.value}
                            {...rest}
                            required={false}
                            tabIndex={-1}
                            className={cn('text-foreground h-8 w-16', inputClassName, 'rounded-full border-none')}
                            onCheckedChange={field.onChange as (value: boolean) => void}
                        />
                    )}

                    {isOnlyRead && <StatusCircle status={field.value} className="h-8 w-8" />}
                </FieldContainer>
            )}
        />
    );
}
