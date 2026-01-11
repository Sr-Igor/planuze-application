//React & Hooks
import { SimpleInfinitySelect } from '@/components/form/select/cases/simple-infinity';
import { ISimpleInfinityProps } from '@/components/form/select/types';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function InfinitySelectController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    queryParams,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    ISimpleInfinityProps<any> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <SimpleInfinitySelect
                        {...field}
                        {...rest}
                        className={cn('text-foreground', inputClassName)}
                        value={field.value || null}
                        onChange={(value) => field.onChange(value)}
                        queryParams={queryParams}
                    />
                </Container>
            )}
        />
    );
}
