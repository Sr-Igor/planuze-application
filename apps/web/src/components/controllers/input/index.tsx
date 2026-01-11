//React & Hooks
import { useState } from "react";

import { EyeIcon } from "lucide-react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { Button , Input } from "@repo/ui";

import { Field } from "@/hooks/form/types";
import { cn } from "@/lib/utils";

import { Container } from "../container";

export function InputController<FormType extends FieldValues>({
  name,
  control,
  className,
  inputClassName,
  ...rest
}: UseControllerProps<FormType> &
  Field<FormType> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [type, setType] = useState(rest.type || "text");

  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container className={className} name={name} error={fieldState.error?.message} {...rest}>
          <span className="relative flex items-center gap-2">
            <Input
              value={field.value}
              {...rest}
              required={false}
              tabIndex={-1}
              className={cn(
                "text-foreground",
                rest.type === "password" && "pr-10",
                inputClassName,
                rest.disabled && "pointer-events-none"
              )}
              onChange={(e) => {
                if (rest.type === "number") {
                  const value = e.target.value ? parseFloat(e.target.value) : null;
                  field.onChange(value);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              type={type}
            />

            {rest.type === "password" && (
              <Button
                className="absolute top-0 right-0"
                variant="ghost"
                type="button"
                tabIndex={-1}
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleType();
                }}
              >
                <EyeIcon />
              </Button>
            )}
          </span>
        </Container>
      )}
    />
  );
}
