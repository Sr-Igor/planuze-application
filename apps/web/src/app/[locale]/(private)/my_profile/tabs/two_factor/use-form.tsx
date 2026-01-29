import { useEffect, useState } from "react";

import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { user_two_auth } from "@repo/types";

import { useConstants } from "@/hooks/constants";

export type FormType = {
  method?: string;
  target?: string;
  current_password?: string;
  active?: boolean;
};

export interface IUseFormProps {
  data?: Partial<user_two_auth> | null;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const { twoFactorMethod } = useConstants();
  const defaultValues = {
    method: "email",
    active: true,
  };

  const [wMethod, setWMethod] = useState<string | undefined>(data?.method || defaultValues.method);

  const schema: IValidatorRequest = {
    body: [
      {
        key: "method",
        method: "enumeric",
        coerse: "string",
        values: ["email", "phone"],
      },
      {
        key: "target",
        method: "string",
        coerse: "string",
      },
      {
        key: "current_password",
        coerse: "string",
        method: "string",
      },
      {
        key: "active",
        coerse: "boolean",
        method: "boolean",
        optional: true,
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "select",
      name: "method",
      label: "method",
      className: "col-span-2",
      disabled: disabled || !!data?.id,
      required: true,
      options: twoFactorMethod,
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      className: "col-span-1",
      disabled,
      skipHtmlFor: true,
    },
    {
      field: "phone",
      ref_key: "phone",
      name: "target",
      label: "phone",
      className: "col-span-3",
      required: true,
      disabled: disabled || !!data?.id,
    },
    {
      field: "input",
      ref_key: "email",
      name: "target",
      label: "email",
      className: "col-span-3",
      required: true,
      disabled: disabled || !!data?.id,
    },

    {
      field: "input",
      type: "password",
      name: "current_password",
      label: "current_password",
      required: true,
      className: "col-span-3",
      disabled,
    },
  ];

  const bodySchema = schema.body?.map((i) => {
    return i.key === "target" ? { ...i, method: wMethod || "string" } : i;
  }) as IValidatorRequest["body"];

  const form = useFormList<FormType>({
    fields,
    schema: { body: bodySchema },
    values: data || {},
    defaultValues,
  });

  const method = form.hook.watch("method");

  useEffect(() => {
    if (data?.method !== method) form.hook.setValue("target", "");
    else form.hook.reset({ ...data, target: "" });
    form.hook.clearErrors();
    setWMethod(method || defaultValues.method);
  }, [method]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.filter((field) => {
        if (field.name === "target") {
          return field.ref_key === wMethod;
        } else {
          return true;
        }
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
