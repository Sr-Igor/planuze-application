//React & Hooks
import { Numeric } from '@/components/form/numeric';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function NumericController<FormType extends FieldValues>({
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
                <Container className={className} name={name} error={fieldState.error?.message} {...rest}>
                    <Numeric
                        value={field.value}
                        className={cn('text-foreground', inputClassName)}
                        onChange={(e) => {
                            field.onChange(e);
                        }}
                        {...rest}
                    />
                </Container>
            )}
        />
    );
}
