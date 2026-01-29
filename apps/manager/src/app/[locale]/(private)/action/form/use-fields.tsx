"use client";

import { Field, IValidatorRequest } from "@repo/form";
import { action } from "@repo/types";

export type FormType = Partial<action>;

export interface iUseFieldsProps {
  disabled?: boolean;
}

export const useFields = ({ disabled = false }: iUseFieldsProps) => {
  const defaultValues: FormType = {
    title: "",
    integration: false,
    deleted: false,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "integration",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },

      {
        key: "deleted",
        method: "boolean",
        coerse: "boolean",
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "switch",
      name: "integration",
      label: "integration",
      required: true,
      disabled,
      className: "col-span-1",
      skipHtmlFor: true,
    },
    {
      field: "switch",
      name: "deleted",
      label: "deleted",
      required: true,
      disabled,
      className: "col-span-1",
      skipHtmlFor: true,
    },
  ];

  return { schema, fields, defaultValues };
};
