import { z } from "zod";

import { IValidatorRequest } from "@repo/form";
import { Field, IUseFormListReturn, useFormList } from "@repo/form";
import { company } from "@repo/types";

export type FormType = {
  logo?: string | File | Blob | null;
  name?: string;
  entity?: string;
  email?: string;
  phone?: string;
};

export interface IUseFormProps {
  data?: Partial<company>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const defaultValues = {
    logo: null,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "name",
        method: "string",
        coerse: "string",
      },
      {
        key: "email",
        method: "email",
        coerse: "string",
        optional: true,
      },
      {
        key: "logo",
        optional: true,
        coerse: "File",
        custom: z.union([z.instanceof(File), z.string(), z.null()]),
      },
      {
        key: "email",
        method: "email",
        coerse: "string",
      },
      {
        key: "phone",
        method: "phone",
        coerse: "string",
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "avatar",
      name: "logo",
      path: "company/logo",
      publicFile: true,
      className: "col-span-full",
      clearable: true,
      disabled,
    },
    {
      field: "input",
      name: "name",
      label: "name",
      required: true,
      className: "col-span-1",
      disabled,
    },
    {
      field: "input",
      name: "entity",
      label: data?.type === "string" ? "document" : data?.type,
      className: "col-span-1",
      disabled: true,
    },
    {
      field: "input",
      name: "email",
      label: "email",
      required: true,
      className: "col-span-1",
      disabled,
    },
    {
      field: "phone",
      name: "phone",
      label: "phone",
      required: true,
      className: "col-span-1",
      disabled,
    },
  ];

  const form = useFormList<FormType>({
    fields,
    schema,
    values: data,
    defaultValues,
  });

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
