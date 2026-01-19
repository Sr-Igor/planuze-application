"use client";

import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { FormStateService } from "../../core/application/services/form-state.service";
import { IUseFormListReturn, UseFormListProps } from "../../shared/types";
import { Form } from "../components/form/form.component";
import { useValidator } from "./use-validator.hook";

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
  const formStateService = new FormStateService<FormType>();

  const formResolver = useMemo(() => {
    let resolvedZodSchema: ZodSchema<FormType>;

    if (schema instanceof z.ZodSchema) {
      resolvedZodSchema = schema;
    } else {
      resolvedZodSchema = validator(schema);
    }

    return zodResolver(resolvedZodSchema as any);
  }, [schema, validator]);

  const initialDefaultValues: DefaultValues<FormType> = useMemo(() => {
    return formStateService.calculateInitialValues(
      fields,
      defaultValues as Partial<FormType> | undefined,
      values
    ) as DefaultValues<FormType>;
  }, [fields, defaultValues, values, formStateService]);

  const initialValues = useMemo(() => {
    return formStateService.calculateInitialValues(
      fields,
      defaultValues as Partial<FormType> | undefined,
      values
    ) as FormType;
  }, [fields, defaultValues, values, formStateService]);

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
