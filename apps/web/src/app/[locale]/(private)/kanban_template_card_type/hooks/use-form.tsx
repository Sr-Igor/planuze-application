"use client";

import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { kanban_template_card_type } from "@repo/types";

import { IUseHookProps } from "@/templates/list/base/types";

export const useForm = ({ disabled, state }: IUseHookProps<kanban_template_card_type>) => {
  const t = useLang();

  const defaultValues: Partial<kanban_template_card_type> = {
    title: "",
    color: "#FFFFFF",
    icon: "",
    principal: false,
    problem: false,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "icon",
        method: "string",
        coerse: "string",
      },
      {
        key: "color",
        method: "string",
        coerse: "string",
      },
      {
        key: "principal",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "problem",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const fields: Field<Partial<kanban_template_card_type>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      label: "color",
      field: "input",
      name: "color",
      required: true,
      disabled,
      type: "color",
      className: "col-span-1",
    },
    {
      label: "icon",
      field: "icon",
      name: "icon",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      label: "principal",
      field: "switch",
      name: "principal",
      disabled,
      tooltip: t.tooltip("principal_card_type_tooltip"),
      className: "col-span-1",
    },
    {
      label: "problem",
      field: "switch",
      name: "problem",
      disabled,
      tooltip: t.tooltip("problem_card_type_tooltip"),
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<kanban_template_card_type>>({
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
