'use client';

import { useState } from 'react';

import { Controller, FieldValues } from 'react-hook-form';

import { IFieldComponentProps } from '#/core/domain/interfaces';
import { FieldContainer } from '../../base/container/field-container.component';
import { Avatar } from './avatar-export.component';

export function AvatarField<FormType extends FieldValues>({
    name,
    control,
    className,
    path,
    publicFile,
    clearable,
    ...rest
}: IFieldComponentProps<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const [blob, setBlob] = useState<string | null>('');

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const currentBlob = blob || field.value;

                return (
                    <FieldContainer
                        className={className}
                        error={fieldState.error?.message}
                        name={name}
                        htmlFor="none"
                        {...rest}
                    >
                        <Avatar
                            blob={currentBlob}
                            clearable={clearable}
                            name={name}
                            path={path}
                            publicFile={publicFile}
                            {...rest}
                            onChange={(e) => {
                                const file = e?.target?.files?.[0];
                                if (file) {
                                    field.onChange(file);
                                    const blobImg = URL.createObjectURL(file);
                                    setBlob(blobImg);
                                    return;
                                }
                                field.onChange(null);
                                setBlob(null);
                            }}
                        />
                    </FieldContainer>
                );
            }}
        />
    );
}
