'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '../../../../core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Textarea } from './textarea-export.component';

export function TextareaField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> & {
    inputClassName?: string;
} & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Textarea
                        {...rest}
                        value={field.value || undefined}
                        tabIndex={-1}
                        required={false}
                        className={cn('text-foreground', inputClassName)}
                        onChange={(e) => {
                            const value = e.target.value === '' ? undefined : e.target.value;
                            field.onChange(value);
                        }}
                    />
                </FieldContainer>
            )}
        />
    );
}
