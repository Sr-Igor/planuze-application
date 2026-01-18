"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { cost_center } from "@repo/types";

import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { IUseHookProps } from "@/templates/list/base/types";

export const useForm = ({ disabled, state }: IUseHookProps<cost_center>) => {
  const defaultValues: Partial<cost_center> = {
    title: "",
    active: true,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
      },
    ],
  };

  const fields: Field<Partial<cost_center>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      label: "active",
      field: "switch",
      name: "active",
      disabled,
    },
  ];

  const form = useFormList<Partial<cost_center>>({
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
