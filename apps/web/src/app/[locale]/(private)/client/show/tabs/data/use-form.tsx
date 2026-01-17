import { IValidatorRequest } from "@deviobr/validator";
import { z } from "zod";

import { client } from "@repo/types";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

export type FormType = {
  avatar: string | File | Blob | null;
  name: string;
  email: string;
  phone: string;
  comment?: string;
};

export interface IUseFormProps {
  data?: Partial<client>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const defaultValues = {
    avatar: null,
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
        nullable: true,
      },
      {
        key: "phone",
        method: "phone",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "avatar",
        optional: true,
        coerse: "File",
        custom: z.union([z.instanceof(File), z.string(), z.null()]),
      },
      {
        key: "comment",
        method: "string",
        coerse: "string",
        nullable: true,
        optional: true,
      },
    ],
  };

  const fields: Field<Partial<client>>[] = [
    {
      field: "avatar",
      name: "avatar",
      className: "col-span-2",
      clearable: true,
      path: "client/avatar",
      disabled,
    },
    {
      field: "input",
      name: "name",
      label: "name",
      required: true,
      className: "col-span-2",
      disabled,
    },
    {
      field: "input",
      name: "email",
      label: "email",
      className: "col-span-1",
      disabled,
    },
    {
      field: "phone",
      name: "phone",
      label: "phone",
      className: "col-span-1",
      disabled,
    },
    {
      field: "textarea",
      name: "comment",
      label: "comment",
      className: "col-span-2",
      inputClassName: "h-32 resize-none",
      disabled,
    },
  ];

  const form = useFormList<Partial<client>>({
    fields,
    schema,
    values: { ...data, comment: data?.comment || undefined },
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
