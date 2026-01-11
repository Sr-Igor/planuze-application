//React & Hooks
import { IIconProps, Icons } from '@/components/form/icon';
import { Field } from '@/hooks/form/types';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function IconController<FormType extends FieldValues>({
    name,
    control,
    className,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    IIconProps &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Icons
                        {...field}
                        {...rest}
                        tabIndex={-1}
                        required={false}
                        className='text-foreground'
                        value={field.value || ''}
                        onChange={(value) => field.onChange(value)}
                    />
                </Container>
            )}
        />
    );
}
