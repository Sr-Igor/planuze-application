import { projectVersionIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { project_config, project_version } from "@repo/types";

import { IUseHookProps } from "@/templates/card-crud/type";
import { Shallow } from "@/types/shallowType";

type Form = Shallow<project_config>;

const defaultValues: Partial<Form> = {
  util_hour_day: null,
  total_hour_day: null,
};

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

export const useForm = ({ disabled, state, data, indexData }: IUseHookProps<Form>) => {
  const t = useLang();

  const alreadyRegistered = indexData?.map((item: project_config) => item.project_version_id);

  const fields: Field<Form>[] = [
    {
      field: "select-simple-infinity",
      name: "project_version_id",
      label: "project_version_id",
      disabled,
      className: "col-span-2",
      required: true,
      cacheKey: "project_version_infinity",
      request: projectVersionIndex,
      queryParams: {
        project_id: data?.id,
        orderKey: "createdAt",
        orderValue: "desc",
      },
      formatter: (items: project_version[]) =>
        items
          ?.filter((projectVersion) => !alreadyRegistered.includes(projectVersion.id))
          ?.map((projectVersion) => ({
            label: `V${projectVersion.version}`,
            value: projectVersion.id,
            item: projectVersion,
          })) || [],
      fallbackValue: state?.item?.project_version
        ? `V${state?.item?.project_version?.version}`
        : undefined,
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

  const form = useFormList<Form>({
    fields,
    schema,
    values: state.item,
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
