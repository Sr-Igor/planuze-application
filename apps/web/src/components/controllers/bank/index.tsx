//React & Hooks
import { Bank, IBankProps } from '@/components/form/bank';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function BankController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    IBankProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Bank
                        {...field}
                        {...rest}
                        tabIndex={-1}
                        required={false}
                        className={cn('text-foreground', inputClassName)}
                        value={field.value || ''}
                        onChange={(value) => field.onChange(value)}
                    />
                </Container>
            )}
        />
    );
}
