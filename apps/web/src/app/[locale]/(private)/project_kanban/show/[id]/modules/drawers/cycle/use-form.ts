"use client";

import { useEffect, useState } from "react";

import { IValidatorRequest } from "@deviobr/validator";
import { differenceInDays } from "date-fns";

import {
  kanban_template,
  project_kanban_cycle,
  project_version,
  work_type,
} from "@repo/types";
import { useLang } from "@repo/language/hook";

import { index } from "@repo/api/web/req/kanban_template";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { Shallow } from "@/types/shallowType";

import { useKanbanShow } from "../../../context";

export type Form = Shallow<project_kanban_cycle>;

export const useForm = ({ disabled, item }: IUseHookProps<Form>) => {
  const t = useLang();

  const { select } = useKanbanShow();

  const [maxUtilDay, setMaxUtilDay] = useState<number | undefined>();

  const defaultValues: Partial<Form> = {
    start_date: null,
    end_date: null,
    kanban_template_id: undefined,
    prepare: false,
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
        key: "project_version_id",
        method: "string",
        coerse: "string",
        model: "project_version",
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
        key: "prepare",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "work_type_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "work_type",
        column: "id",
      },
      {
        key: "util_day",
        method: "numeric",
        coerse: "number",
        optional: true,
        nullable: true,
        positive: true,
        max: maxUtilDay,
      },
    ],
    relations: {
      query: [],
      params: [],
      body: [
        {
          type: "majorOrEqual",
          keys: ["end_date", "start_date"],
        },
      ],
    },
  };

  const fields: Field<Partial<Form>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "infinity_select",
      name: "kanban_template_id",
      label: "kanban_template_id",
      placeholder: disabled || !!item?.id ? t.helper("none") : undefined,
      className: "col-span-1",
      disabled: disabled || !!item?.id,
      cacheKey: "kanban_template_infinity",
      request: index,
      formatter: (items: kanban_template[]) =>
        items?.map((template) => ({
          label: template.title,
          value: template.id,
          item: template,
        })) || [],
    },
    {
      field: "infinity_select",
      name: "project_version_id",
      label: "project_version_id",
      required: true,
      disabled,
      className: "col-span-1",
      cacheKey: "project_version_infinity",
      index: select.version,
      search: select.search.version,
      setSearch: (search) => select.handleSearch("version", search),
      formatter: (items: project_version[]) =>
        items?.map((version) => ({
          label: `V${version.version}${version.name ? ` - ${version.name}` : ""}`,
          value: version.id,
          item: version,
        })) || [],
    },
    {
      field: "infinity_select",
      name: "work_type_id",
      label: "work_type_id",
      disabled,
      cacheKey: "work_type_infinity",
      index: select.workType,
      search: select.search.workType,
      setSearch: (search) => select.handleSearch("workType", search),
      formatter: (items: work_type[]) =>
        items?.map((workType) => ({
          label: workType.title,
          value: workType.id,
          item: workType,
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
    {
      field: "numeric",
      name: "util_day",
      label: "util_day",
      disabled,
      className: "col-span-1",
      int: true,
      positive: true,
    },

    {
      field: "switch",
      name: "prepare",
      label: "prepare",
      disabled,
      tooltip: t.tooltip("prepare_cycle_tooltip"),
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<Form>>({
    fields,
    schema: {
      body: schema.body?.filter((i) => (item?.id ? i.key !== "kanban_template_id" : true)) || [],
      relations: schema.relations,
    },
    values: item,
    defaultValues,
  });

  const startDate = form.hook.watch("start_date");
  const endDate = form.hook.watch("end_date");
  const utilsDay = form.hook.watch("util_day");

  useEffect(() => {
    if (startDate && endDate && !utilsDay) {
      const days = differenceInDays(endDate, startDate);
      const max = days > 0 ? days : undefined;

      setMaxUtilDay(max);
      form.hook.setValue("util_day", max);
    }

    if (endDate) {
      form.hook.clearErrors("start_date");
    }
  }, [startDate, endDate]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: fields.map((field) => {
        switch (field.name) {
          case "project_version_id":
            return {
              ...field,
              immediatelyCallback: (item: project_version) => {
                form.hook.setValue("project_version_id", item?.id, {
                  shouldDirty: false,
                });
              },
            };
          default:
            return field;
        }
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
