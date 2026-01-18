'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Tags } from './tags-export.component';
import { ITagsProps } from '#/shared/types/tags.types';

export function TagsField<FormType extends FieldValues, T = any>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Omit<ITagsProps<T>, 'value' | 'onChange'>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Tags
                        {...rest}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        className={cn('text-foreground', inputClassName)}
                    />
                </FieldContainer>
            )}
        />
    );
}
