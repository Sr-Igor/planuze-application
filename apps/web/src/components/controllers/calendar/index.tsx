//React & Hooks
import { Calendar } from '@/components/form/calendar';
import { Field } from '@/hooks/form/types';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function CalendarController<FormType extends FieldValues>({
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
                    <Calendar date={field.value} setDate={field.onChange} {...rest} className={inputClassName} />
                </Container>
            )}
        />
    );
}
