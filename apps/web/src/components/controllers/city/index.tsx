//React & Hooks
import { Cities, ICityProps } from '@/components/form/cities';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function CityController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    ICityProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Cities
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
