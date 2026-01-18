"use client";

import { useMemo } from "react";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle, project_kanban_cycle_column } from "@repo/types";

import { useFormList } from "@repo/form";
import { Field } from "@repo/form";

export interface FormValues {
  project_kanban_cycle_id?: string | null;
  project_kanban_cycle_column_id?: string | null;
}

export interface IUseFormProps {
  disabled: boolean;
  cycle?: project_kanban_cycle | null;
  item?: Partial<project_kanban_cycle_column>;
}

export const useForm = ({ disabled, cycle, item }: IUseFormProps) => {
  const defaultValues: Partial<FormValues> = {
    project_kanban_cycle_column_id: null,
  };

  const columns = useMemo(
    () =>
      cycle?.project_kanban_cycle_columns
        ?.sort((a, b) => a.order - b.order)
        ?.filter((i) => i.id !== item?.id)
        ?.map((i) => ({
          label: i.title,
          value: i.id,
        })) || [],
    [cycle, item]
  );

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_kanban_cycle_column_id",
        method: "string",
        coerse: "string",
        model: "kanban_cycle_column",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<FormValues>>[] = [
    {
      field: "select",
      name: "project_kanban_cycle_column_id",
      label: "project_kanban_cycle_column_id",
      className: "col-span-2",
      disabled,
      required: true,
      options: columns,
    },
  ];

  const form = useFormList<Partial<FormValues>>({
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
