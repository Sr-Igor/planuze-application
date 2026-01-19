'use client';

import { Controller, FieldValues } from 'react-hook-form';

import { cn } from '@repo/ui';

import { IFieldComponentProps } from '../../../../core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Editor } from './editor-export.component';
import type { EditorProps } from '../../../../shared/types/editor.types';

export function EditorField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Omit<EditorProps, 'value' | 'onChange'>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Editor
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
