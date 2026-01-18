'use client';

import { useState } from 'react';

import { EyeIcon } from 'lucide-react';
import { Controller, FieldValues } from 'react-hook-form';

import { Button, Input, cn } from '@repo/ui';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';

export function InputField<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const [type, setType] = useState(rest.type || 'text');

    const toggleType = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContainer
                    className={className}
                    name={name}
                    error={fieldState.error?.message}
                    {...rest}
                >
                    <span className="relative flex items-center gap-2">
                        <Input
                            value={field.value}
                            {...rest}
                            required={false}
                            tabIndex={-1}
                            className={cn(
                                'text-foreground',
                                rest.type === 'password' && 'pr-10',
                                inputClassName,
                                rest.disabled && 'pointer-events-none'
                            )}
                            onChange={(e) => {
                                if (rest.type === 'number') {
                                    const value = e.target.value ? Number.parseFloat(e.target.value) : null;
                                    field.onChange(value);
                                } else {
                                    field.onChange(e.target.value);
                                }
                            }}
                            type={type}
                        />

                        {rest.type === 'password' && (
                            <Button
                                className="absolute top-0 right-0"
                                variant="ghost"
                                type="button"
                                tabIndex={-1}
                                size="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleType();
                                }}
                            >
                                <EyeIcon />
                            </Button>
                        )}
                    </span>
                </FieldContainer>
            )}
        />
    );
}
