//React & Hooks
import { DaysOfMonth, DaysOfMonthProps } from '@/components/form/days_of_month';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function DaysOfMonthController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    DaysOfMonthProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <DaysOfMonth
                        {...field}
                        {...rest}
                        className={cn('text-foreground', inputClassName)}
                        onValueChange={(value) => {
                            field.onChange(value);
                        }}
                    />
                </Container>
            )}
        />
    );
}
