//React & Hooks
import { IStateProps, States } from '@/components/form/states';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function StateController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    IStateProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <States
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
