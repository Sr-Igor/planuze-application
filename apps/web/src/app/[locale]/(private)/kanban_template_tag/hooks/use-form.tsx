"use client";

import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { kanban_template_tag } from "@repo/types";

import { IUseHookProps } from "@/templates/list/base/types";

export const useForm = ({ disabled, state }: IUseHookProps<kanban_template_tag>) => {
  const defaultValues: Partial<kanban_template_tag> = {
    title: "",
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
    ],
  };

  const fields: Field<Partial<kanban_template_tag>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
  ];

  const form = useFormList<Partial<kanban_template_tag>>({
    fields,
    schema,
    values: state.item,
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
