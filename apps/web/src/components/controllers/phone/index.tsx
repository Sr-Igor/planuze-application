//React & Hooks
import { Phone, PhoneProps } from '@/components/form/phone';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function PhoneController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    PhoneProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Phone
                        {...field}
                        {...rest}
                        className={cn('text-foreground', inputClassName)}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                    />
                </Container>
            )}
        />
    );
}
