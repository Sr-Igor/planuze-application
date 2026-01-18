"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle_card } from "@repo/types";

import { useFormList } from "@repo/form";
import { Field } from "@repo/form";

export interface IUseFormProps {
  disabled: boolean;
}

export const useForm = ({ disabled }: IUseFormProps) => {
  const defaultValues: Partial<project_kanban_cycle_card> = {};

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<project_kanban_cycle_card>>[] = [
    {
      field: "input",
      name: "title",
      required: true,
      disabled,
      inputClassName: "h-8 p-0 px-2",
      className: "p-0",
      id: "fake-card-form-title",
    },
  ];

  const form = useFormList<Partial<project_kanban_cycle_card>>({
    fields,
    schema,
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
