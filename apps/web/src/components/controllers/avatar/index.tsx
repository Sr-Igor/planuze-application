//React & Hooks
import { useState } from 'react';

import { Avatar } from '@/components/form/avatar';
import { Field } from '@/hooks/form/types';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function AvatarController<FormType extends FieldValues>({
    name,
    control,
    className,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const [blob, setBlob] = useState<string | null>('');

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container className={className} error={fieldState.error?.message} name={name} htmlFor='none' {...rest}>
                    <Avatar
                        {...rest}
                        required={false}
                        name={name}
                        blob={blob || field.value}
                        tabIndex={-1}
                        className='text-foreground'
                        onChange={(e) => {
                            const file = e?.target?.files?.[0];
                            if (file) {
                                field.onChange(file);
                                const blobImg = URL.createObjectURL(file!);
                                setBlob(blobImg);

                                return;
                            }
                            field.onChange(null);
                            setBlob(null);
                        }}
                    />
                </Container>
            )}
        />
    );
}
