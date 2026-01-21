import { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

import { IValidatorRequest } from "@repo/form";

import { Field as FieldUnion } from "../../core/domain/interfaces";

/**
 * Form field type - discriminated union that provides type-safe props based on field type
 *
 * @example
 * ```tsx
 * const fields: Field<FormType>[] = [
 *   { field: "input", name: "email" },           // Only input props available
 *   { field: "select", name: "role", options: [] }, // options prop is available
 *   { field: "calendar", name: "date", disabledPast: true }, // date props available
 * ];
 * ```
 */
export type Field<FormType extends FieldValues> = FieldUnion<FormType>;

/**
 * Props for useFormList hook
 */
export interface UseFormListProps<FormType extends FieldValues> {
  fields: Field<FormType>[];
  schema: IValidatorRequest | ZodSchema<FormType>;
  defaultValues?: UseFormProps<FormType>["defaultValues"];
  values?: FormType;
  onlyRead?: boolean;
  dependencies?: any;
  resetOptions?: UseFormProps<FormType>["resetOptions"];
}

/**
 * Props for Form component
 */
export interface FormProps<FormType extends FieldValues>
  extends React.ComponentPropsWithoutRef<"form"> {
  fields: Field<FormType>[];
  hook: UseFormReturn<FormType>;
  onlyRead?: boolean;
}

/**
 * Return type of useFormList hook
 */
export interface IUseFormListReturn<FormType extends FieldValues> {
  formProps: {
    fields: Field<FormType>[];
    dependencies: any;
    hook: UseFormReturn<FormType>;
    onlyRead?: boolean;
    className?: string;
  };
  hook: UseFormReturn<FormType>;
  Form: (props: FormProps<FormType>) => React.ReactNode;
  isDirty: boolean;
  isError: boolean;
}
