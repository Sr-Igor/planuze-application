"use client";

import { projectIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { project, project_kanban } from "@repo/types";

import { IUseHookProps } from "@/templates/list/base/types";

export const useForm = ({ disabled, state }: IUseHookProps<project_kanban>) => {
  const defaultValues: Partial<project_kanban> = {};

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_id",
        method: "string",
        coerse: "string",
        model: "project",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<project_kanban>>[] = [
    {
      field: "select-simple-infinity",
      name: "project_id",
      label: "project_id",
      required: true,
      disabled,
      className: "col-span-2",
      cacheKey: "project_infinity",
      request: projectIndex,
      formatter: (items: project[]) =>
        items
          ?.filter((project) => project?.project_kanbans?.length === 0)
          ?.map((project) => ({
            label: project.name,
            value: project.id,
            item: project,
          })) || [],
    },
  ];

  const form = useFormList<Partial<project_kanban>>({
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
