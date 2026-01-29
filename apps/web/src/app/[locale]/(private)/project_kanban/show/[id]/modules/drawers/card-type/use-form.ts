"use client";

import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { project_kanban_cycle_card_type } from "@repo/types";

import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export const useForm = ({ disabled, item }: IUseHookProps<project_kanban_cycle_card_type>) => {
  const t = useLang();

  const defaultValues: Partial<project_kanban_cycle_card_type> = {
    color: "#FFFFFF",
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
        optional: true,
        nullable: true,
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

  const fields: Field<Partial<project_kanban_cycle_card_type>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "icon",
      name: "icon",
      label: "icon",
      disabled,
      required: true,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "color",
      label: "color",
      type: "color",
      disabled,
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "principal",
      label: "principal",
      disabled: disabled || !!item,
      tooltip: t.tooltip("principal_card_type_tooltip"),
      className: "col-span-1",
      skipHtmlFor: true,
    },
    {
      field: "switch",
      name: "problem",
      label: "problem",
      disabled: disabled || !!item,
      tooltip: t.tooltip("problem_card_type_tooltip"),
      className: "col-span-1",
      skipHtmlFor: true,
    },
  ];

  const form = useFormList<Partial<project_kanban_cycle_card_type>>({
    fields,
    schema,
    values: item,
    defaultValues: defaultValues,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      className: "md:grid-cols-2",
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
