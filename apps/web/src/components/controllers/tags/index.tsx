//React & Hooks
import { ISelected, ITagsProps, Tags } from '@/components/form/tags';
import { Field } from '@/hooks/form/types';
import { cn } from '@/lib/utils';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function TagsController<FormType extends FieldValues>({
    name,
    control,
    className,
    inputClassName,
    queryParams,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    ITagsProps<any> &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
                    <Tags
                        {...field}
                        {...rest}
                        className={cn('text-foreground', inputClassName)}
                        value={(field.value as ISelected[]) || null}
                        onChange={(value) => field.onChange(value)}
                        queryParams={queryParams}
                    />
                </Container>
            )}
        />
    );
}
