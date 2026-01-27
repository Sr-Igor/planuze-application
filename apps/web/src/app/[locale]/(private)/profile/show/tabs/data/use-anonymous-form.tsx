"use client";

import { z } from "zod";

import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import { profile } from "@repo/types";

export type FormType = {
  anonymous_avatar: string | File | Blob | null;
  anonymous_name: string;
  phone: string;
  anonymous_email: string;
  active: boolean;
};

export interface IUseFormProps {
  data?: Partial<profile>;
  disabled?: boolean;
}

export type ShallowForm = Shallow<FormType>;

export const useAnonymousForm = ({ data, disabled }: IUseFormProps) => {
  const defaultValues: Partial<FormType> = {
    anonymous_name: "",
    phone: "",
    anonymous_email: "",
    active: true,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "anonymous_avatar",
        optional: true,
        coerse: "File",
        custom: z.union([z.instanceof(File), z.string(), z.null()]),
      },
      {
        key: "anonymous_name",
        method: "string",
        coerse: "string",
      },
      {
        key: "phone",
        method: "phone",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "anonymous_email",
        method: "email",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
        nullable: false,
        optional: true,
      },
    ],
  };

  const fields: Field<Partial<FormType>>[] = [
    {
      field: "avatar",
      name: "anonymous_avatar",
      label: "avatar",
      path: "profile/anonymous_avatar",
      required: true,
      clearable: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "input",
      name: "anonymous_name",
      label: "name",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "anonymous_email",
      label: "email",
      disabled,
      className: "col-span-1",
    },
    {
      field: "phone",
      name: "phone",
      label: "phone",
      disabled,
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      className: "col-span-1",
      disabled,
    },
  ];

  const form = useFormList<Partial<ShallowForm>>({
    fields,
    schema,
    values: data,
    defaultValues: defaultValues,
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
