//React & Hooks
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { Switch } from "@repo/ui";
import { StatusCircle } from "@repo/ui/app";

import { Field } from "@/hooks/form/types";
import { cn } from "@/lib/utils";

import { Container } from "../container";

export function SwitchController<FormType extends FieldValues>({
  name,
  control,
  className,
  inputClassName,
  read,
  ...rest
}: UseControllerProps<FormType> & Field<FormType> & React.DetailedHTMLProps<any, any>) {
  const isOnlyRead = read === "true";
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container className={className} name={name} error={fieldState.error?.message} {...rest}>
          {!isOnlyRead && (
            <Switch
              checked={field.value}
              {...rest}
              required={false}
              tabIndex={-1}
              className={cn("text-foreground h-8 w-16", inputClassName, "rounded-full border-none")}
              onCheckedChange={field.onChange as (value: boolean) => void}
            />
          )}

          {isOnlyRead && <StatusCircle status={field.value} className="h-8 w-8" />}
        </Container>
      )}
    />
  );
}
