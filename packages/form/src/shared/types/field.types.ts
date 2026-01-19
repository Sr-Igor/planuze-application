import { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

import { IValidatorRequest } from "@repo/form";

import { IField } from "../../core/domain/interfaces";

/**
 * Form field type
 */
export type Field<FormType extends FieldValues> = IField<FormType>;

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
