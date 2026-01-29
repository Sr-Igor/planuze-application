"use client";

import { FieldValues } from "react-hook-form";

import { ComponentFactory } from "../../../core/infrastructure/factories/component.factory";
import { FormProps } from "../../../shared/types";
// Loads component registry
import "../fields/component-registry";

export const onlyReadProps = {
  disabled: true,
  tabIndex: -1,
  inputClassName:
    "disabled:opacity-100! border-t-0 border-l-0 border-r-0 rounded-none border-b-1 p-0 outline-none cursor-default opacity-100! bg-transparent",
};

export function Form<FormType extends FieldValues>({
  fields,
  hook,
  onlyRead,
  ...rest
}: Readonly<FormProps<FormType>>) {
  const onlyReadP = onlyRead ? onlyReadProps : {};

  return (
    <form {...rest} data-testid="form">
      {fields.map((field, key) => {
        if (field.hide) return null;

        const Component = ComponentFactory.create(field);

        if (!Component) {
          console.warn(`Component for field type '${String(field.field)}' not found.`);
          return null;
        }

        return (
          <Component
            key={`form--${key}--${String(field.name)}`}
            control={hook.control}
            read={onlyRead?.toString()}
            {...(field as any)}
            {...onlyReadP}
          />
        );
      })}

      <input type="submit" data-testid="submit-button" className="hidden" />
    </form>
  );
}
