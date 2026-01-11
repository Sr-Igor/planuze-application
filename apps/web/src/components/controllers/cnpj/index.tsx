//React & Hooks
import { Cnpj } from '@/components/form/cnpj';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function CnpjController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Cnpj
                        {...field}
                        {...rest}
                        required={false}
                        tabIndex={-1}
                        className={cn('text-foreground', inputClassName)}
                    />
                </Container>
            )}
        />
    );
}
