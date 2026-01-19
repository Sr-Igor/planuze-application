import { useEffect } from "react";

import { useWatch } from "react-hook-form";

import { index as indexProfile } from "@repo/api/web/req/profile";
import { index as indexProjectVersion } from "@repo/api/web/req/project_version";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { profile, project_allocation, project_version } from "@repo/types";

import { IUseHookProps } from "@/templates/card-crud/type";
import { Shallow } from "@/types/shallowType";

type Form = Shallow<project_allocation>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "start_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "end_date",
      optional: true,
      nullable: true,
      method: "date",
      coerse: "Date",
    },
    {
      key: "profile_id",
      model: "profile",
      column: "id",
      method: "string",
      coerse: "string",
    },
    {
      key: "project_version_id",
      method: "string",
      coerse: "string",
      model: "project_version",
      column: "id",
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

export const useForm = ({ disabled, state, data }: IUseHookProps<Form>) => {
  const defaultValues: Partial<Form> = {};

  const fields: Field<Form>[] = [
    {
      field: "infinity_select",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-1",
      required: true,
      disabled,
      cacheKey: "profile_infinity",
      request: indexProfile,
      formatter: (items: profile[]) =>
        items?.map((profile) => ({
          label: profile.user?.name || profile.anonymous_name || "",
          value: profile.id,
          item: profile,
        })) || [],
      fallbackValue:
        state?.item?.profile?.user?.name || state?.item?.profile?.anonymous_name || "-",
    },
    {
      field: "infinity_select",
      name: "project_version_id",
      label: "project_version_id",
      disabled,
      required: true,
      cacheKey: "project_version_infinity",
      request: indexProjectVersion,
      queryParams: {
        project_id: data?.id,
        orderKey: "createdAt",
        orderValue: "desc",
      },
      formatter: (items: project_version[]) =>
        items?.map((projectVersion) => ({
          label: `V${projectVersion.version}`,
          value: projectVersion.id,
          item: projectVersion,
        })) || [],
      fallbackValue: state?.item?.project_version
        ? `V${state?.item?.project_version?.version}`
        : undefined,
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      disabled,
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      disabled,
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state?.item,
    defaultValues,
  });

  const watched = useWatch({
    control: form.hook.control,
    name: ["end_date", "start_date"],
  });

  useEffect(() => {
    form.hook.clearErrors();
  }, watched);
  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
