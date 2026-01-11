//React & Hooks
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { Checkbox } from "@repo/ui";

import { Field } from "@/hooks/form/types";
import { cn } from "@/lib/utils";

import { Container } from "../container";

export function CheckboxController<FormType extends FieldValues>({
  name,
  control,
  className,
  inputClassName,
  ...rest
}: UseControllerProps<FormType> & Field<FormType> & React.DetailedHTMLProps<any, any>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container className={className} name={name} error={fieldState.error?.message} {...rest}>
          <Checkbox
            checked={field.value}
            {...rest}
            required={false}
            tabIndex={-1}
            className={cn("text-foreground h-8 w-8", inputClassName)}
            iconClassName="size-6"
            onCheckedChange={field.onChange as (value: boolean) => void}
          />
        </Container>
      )}
    />
  );
}
