"use client";

import { useEffect, useMemo, useState } from "react";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle } from "@repo/api/generator/types";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

export interface FormValues {
  project_kanban_cycle_id?: string | null;
  project_kanban_cycle_column_id?: string | null;
}

export interface IUseFormProps {
  disabled: boolean;
  cycles: project_kanban_cycle[];
  item?: Partial<project_kanban_cycle>;
}

export const useForm = ({ disabled, cycles, item }: IUseFormProps) => {
  const options =
    cycles
      ?.filter((i) => i.id !== item?.id)
      ?.map((i) => ({
        label: i.title,
        value: i.id,
      })) || [];

  const defaultValues: Partial<FormValues> = {
    project_kanban_cycle_id: null,
    project_kanban_cycle_column_id: null,
  };

  const [watch, setWatch] = useState<FormValues>({});

  const columns = useMemo(
    () =>
      cycles
        ?.find((i) => i.id === watch.project_kanban_cycle_id)
        ?.project_kanban_cycle_columns?.sort((a, b) => a.order - b.order)
        ?.map((i) => ({
          label: i.title,
          value: i.id,
        })) || [],
    [watch.project_kanban_cycle_id, cycles]
  );

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_kanban_cycle_id",
        method: "string",
        coerse: "string",
        model: "kanban_cycle",
        column: "id",
      },
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
      name: "project_kanban_cycle_id",
      label: "project_kanban_cycle_id",
      className: "col-span-1",
      disabled,
      required: true,
      options,
    },
    {
      field: "select",
      name: "project_kanban_cycle_column_id",
      label: "project_kanban_cycle_column_id",
      className: "col-span-1",
      disabled,
      required: true,
      hide: !watch.project_kanban_cycle_id,
      options: columns,
    },
  ];

  const form = useFormList<Partial<FormValues>>({
    fields,
    schema,
    defaultValues: defaultValues,
  });

  const cycle = form.hook.watch("project_kanban_cycle_id");
  const column = form.hook.watch("project_kanban_cycle_column_id");

  useEffect(() => {
    setWatch({
      project_kanban_cycle_id: cycle,
      project_kanban_cycle_column_id: column,
    });
  }, [cycle, column]);

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
