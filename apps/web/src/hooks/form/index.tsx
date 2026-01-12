import { useMemo } from "react";

import { IValidatorRequest } from "@deviobr/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { useValidator } from "@/hooks/validator";

import { Form } from "./form";
import { getInitialValueForField } from "./initial";
import { IUseFormListReturn, UseFormListProps } from "./types";

export function useFormList<FormType extends FieldValues>({
  fields,
  schema,
  defaultValues,
  values = {} as FormType,
  dependencies,
  onlyRead,
  resetOptions,
}: UseFormListProps<FormType>): IUseFormListReturn<FormType> {
  const validator = useValidator();

  const formResolver = useMemo(() => {
    let resolvedZodSchema: ZodSchema<FormType>;

    if (schema instanceof z.ZodSchema) {
      resolvedZodSchema = schema as ZodSchema<FormType>;
    } else {
      resolvedZodSchema = validator(schema as IValidatorRequest) as ZodSchema<FormType>;
    }

    return zodResolver(resolvedZodSchema as any);
  }, [schema, validator]);

  const initialDefaultValues: DefaultValues<FormType> = useMemo(() => {
    const fieldDefaults = fields.reduce((acc, field) => {
      (acc as any)[field.name] = getInitialValueForField(field);
      return acc;
    }, {} as Partial<FormType>);

    return { ...fieldDefaults, ...defaultValues } as DefaultValues<FormType>;
  }, [fields, defaultValues]);

  const initialValues = useMemo(() => {
    const mergedValues = { ...initialDefaultValues, ...values };

    const normalizedValues = Object.fromEntries(
      Object.entries(mergedValues).map(([key, value]) => {
        const field = fields.find((f) => f.name === key);
        if (!field) return [key, value];

        const defaultValue = initialDefaultValues?.[key as keyof typeof initialDefaultValues];

        if (
          (value === null || value === undefined) &&
          defaultValue !== null &&
          defaultValue !== undefined
        )
          return [key, defaultValue];
        if (value === "" && defaultValue === null) return [key, null];
        if (value === "" && defaultValue === undefined) return [key, undefined];

        return [key, value];
      })
    ) as FormType;

    return normalizedValues;
  }, [initialDefaultValues, values, defaultValues, fields]);

  const hook = useForm<FormType>({
    resolver: formResolver,
    mode: "onChange",
    defaultValues: initialDefaultValues,
    values: initialValues,
    resetOptions,
  });

  const isDirty = hook.formState.isDirty;
  const isError = !!Object.keys(hook.formState.errors).length;

  return {
    formProps: {
      fields,
      dependencies,
      hook,
      onlyRead,
    },
    hook,
    Form,
    isDirty,
    isError,
  };
}
