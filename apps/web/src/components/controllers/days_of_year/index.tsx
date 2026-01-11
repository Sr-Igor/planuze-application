//React & Hooks
import { DaysOfYear, DaysOfYearProps } from '@/components/form/days_of_year';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function DaysOfYearController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    DaysOfYearProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <DaysOfYear
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
