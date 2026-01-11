//React & Hooks
import { SimpleSelect } from '@/components/form/select/cases/simple';
import { ISimpleSelectProps } from '@/components/form/select/types';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function SelectController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    ISimpleSelectProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <SimpleSelect {...field} {...rest} className={cn('text-foreground', inputClassName)} />
                </Container>
            )}
        />
    );
}
