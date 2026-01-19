import { useEffect } from "react";

import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { user } from "@repo/types";

export type FormType = {
  current_password?: string;
  password?: string;
  password_confirm?: string;
};

export interface IUseFormProps {
  data?: Partial<user> | null;
  disabled?: boolean;
}

export const useForm = ({ disabled }: IUseFormProps) => {
  const defaultValues = {
    current_password: "",
    password: "",
    password_confirm: "",
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "current_password",
        coerse: "string",
        method: "string",
      },
      {
        key: "password",
        coerse: "string",
        method: "password",
      },
      {
        key: "password_confirm",
        coerse: "string",
        method: "password",
      },
    ],
    relations: {
      body: [
        {
          keys: ["password", "password_confirm"],
          type: "equal",
        },
      ],
    },
  };

  const fields: Field<FormType>[] = [
    {
      field: "input",
      name: "current_password",
      label: "current_password",
      required: true,
      type: "password",
      className: "col-span-2",
    },
    {
      field: "input",
      name: "password",
      label: "new_password",
      required: true,
      type: "password",
      className: "col-span-2",
    },
    {
      field: "input",
      name: "password_confirm",
      label: "confirm_new_password",
      required: true,
      type: "password",
      className: "col-span-2",
    },
  ];

  const form = useFormList<FormType>({
    fields,
    schema,
    values: {},
    defaultValues,
  });

  const password = form.hook.watch("password");
  const passwordConfirm = form.hook.watch("password_confirm");

  useEffect(() => {
    form.hook.clearErrors("password_confirm");
  }, [password]);

  useEffect(() => {
    form.hook.clearErrors("password");
  }, [passwordConfirm]);

  return {
    ...form,
    config: {
      schema,
      fields,
      values: {},
      defaultValues,
    },
  };
};
