//React & Hooks
import { Editor, EditorProps } from '@/components/form/editor';
import { Field } from '@/hooks/form/types';

import { Container } from '../container';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

export function EditorController<FormType extends FieldValues>({
    name,
    control,
    className,
    ...rest
}: UseControllerProps<FormType> &
    Field<FormType> &
    EditorProps & { skipHtmlFor?: boolean } & React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Container
                    name={name}
                    className={className}
                    error={fieldState.error?.message}
                    skipHtmlFor={true}
                    {...rest}>
                    <Editor
                        {...field}
                        {...rest}
                        className={rest.inputClassName}
                        value={field.value || null}
                        onChange={(value) => field.onChange(value)}
                    />
                </Container>
            )}
        />
    );
}
