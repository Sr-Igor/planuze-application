"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { useLang } from "@repo/language/hook";

import { project_kanban_cycle_column } from "@/api/generator/types";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export const useForm = ({ disabled, item }: IUseHookProps<project_kanban_cycle_column>) => {
  const t = useLang();

  const defaultValues: Partial<project_kanban_cycle_column> = {
    color: "#FFFFFF",
    finished: false,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
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
        key: "finished",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "description",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<project_kanban_cycle_column>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "input",
      name: "description",
      label: "description",
      className: "col-span-2",
      disabled,
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
      name: "finished",
      label: "finished",
      disabled,
      tooltip: t.tooltip("cards_moved_for_this_column_will_be_finished"),
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<project_kanban_cycle_column>>({
    fields,
    schema,
    values: item,
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
