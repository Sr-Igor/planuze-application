"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { useLang } from "@repo/language/hook";

import { project_config, project_version } from "@/api/generator/types";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { Shallow } from "@/types/shallowType";

import { useKanbanShow } from "../../../context";

export type Form = Shallow<project_config>;

export const useForm = ({ disabled, item }: IUseHookProps<Form>) => {
  const t = useLang();

  const { select, data } = useKanbanShow();

  const defaultValues: Partial<Form> = {
    util_hour_day: null,
    total_hour_day: null,
  };

  const alreadyRegistered = data.configs?.map((item: project_config) => item.project_version_id);

  const schema: IValidatorRequest = {
    body: [
      {
        key: "util_hour_day",
        method: "numeric",
        coerse: "number",
        positive: true,
      },
      {
        key: "total_hour_day",
        method: "numeric",
        coerse: "number",
        positive: true,
      },
      {
        key: "project_version_id",
        method: "string",
        coerse: "string",
        model: "project_version",
        column: "id",
      },
    ],
  };
  const fields: Field<Partial<Form>>[] = [
    {
      field: "infinity_select",
      name: "project_version_id",
      label: "project_version_id",
      disabled,
      className: "col-span-2",
      cacheKey: "project_version_infinity",
      index: select.version,
      search: select.search.version,
      setSearch: (search) => select.handleSearch("version", search),
      formatter: (items: project_version[]) =>
        items
          ?.filter((projectVersion) => !alreadyRegistered.includes(projectVersion.id))
          ?.map((projectVersion) => ({
            label: `V${projectVersion.version}`,
            value: projectVersion.id,
            item: projectVersion,
          })) || [],
      fallbackValue: item?.project_version ? `V${item?.project_version?.version}` : undefined,
    },
    {
      field: "numeric",
      name: "total_hour_day",
      label: "total_hour_day",
      className: "col-span-1",
      required: true,
      disabled,
    },
    {
      field: "numeric",
      name: "util_hour_day",
      label: "util_hour_day",
      className: "col-span-1",
      required: true,
      disabled,
      tooltip: t.tooltip("util_hour_day_tooltip"),
    },
  ];

  const form = useFormList<Partial<Form>>({
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
