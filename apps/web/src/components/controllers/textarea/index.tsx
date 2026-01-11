//React & Hooks
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { Textarea } from "@repo/ui";

import { Field } from "@/hooks/form/types";
import { cn } from "@/lib/utils";

import { Container } from "../container";

export function TextareaController<FormType extends FieldValues>({
  name,
  control,
  className,
  inputClassName,
  ...rest
}: UseControllerProps<FormType> &
  Field<FormType> & { inputClassName?: string } & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container name={name} className={className} error={fieldState.error?.message} {...rest}>
          <Textarea
            {...rest}
            value={field.value || undefined}
            tabIndex={-1}
            required={false}
            className={cn("text-foreground", inputClassName)}
            onChange={(e) => {
              const value = e.target.value === "" ? undefined : e.target.value;
              field.onChange(value);
            }}
          />
        </Container>
      )}
    />
  );
}
