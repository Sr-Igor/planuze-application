"use client";

import { kanbanTemplateIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { kanban_template, project_kanban_cycle } from "@repo/types";

import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export const useForm = ({ disabled, item }: IUseHookProps<project_kanban_cycle>) => {
  const defaultValues: Partial<project_kanban_cycle> = {
    start_date: null,
    end_date: null,
    kanban_template_id: undefined,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "kanban_template_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "kanban_template",
        column: "id",
      },
      {
        key: "start_date",
        method: "date",
        coerse: "Date",
        optional: true,
        nullable: true,
      },
      {
        key: "end_date",
        method: "date",
        coerse: "Date",
        optional: true,
        nullable: true,
      },
      {
        key: "order",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<project_kanban_cycle>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "select-simple-infinity",
      name: "kanban_template_id",
      label: "kanban_template_id",
      className: "col-span-1",
      disabled: disabled || !!item?.id,
      cacheKey: "kanban_template_infinity",
      request: kanbanTemplateIndex,
      formatter: (items: kanban_template[]) =>
        items?.map((template) => ({
          label: template.title,
          value: template.id,
          item: template,
        })) || [],
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      disabled,
      className: "col-span-1",
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      disabled,
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<project_kanban_cycle>>({
    fields,
    schema: {
      body: schema.body?.filter((i) => (item?.id ? i.key !== "kanban_template_id" : true)) || [],
    },
    values: item,
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
