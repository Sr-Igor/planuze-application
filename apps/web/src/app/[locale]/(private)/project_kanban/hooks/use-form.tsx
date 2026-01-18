"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { project, project_kanban } from "@repo/types";

import { index } from "@repo/api/web/req/project";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
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
      field: "infinity_select",
      name: "project_id",
      label: "project_id",
      required: true,
      disabled,
      className: "col-span-2",
      cacheKey: "project_infinity",
      request: index,
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
