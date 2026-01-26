import { useEffect } from "react";

import { useWatch } from "react-hook-form";

import { profileIndex } from "@repo/api/web";
import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import { useUserAuth } from "@repo/redux/hooks";
import { profile, project_version } from "@repo/types";

import { IUseHookProps } from "@/templates/card-crud/type";

type Form = Shallow<project_version>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "name",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "original_start_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "original_end_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "real_start_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "real_end_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "version",
      method: "numeric",
      coerse: "number",
      optional: false,
    },
    {
      key: "owner_id",
      method: "string",
      coerse: "string",
      model: "profile",
      column: "id",
    },
  ],
  relations: {
    query: [],
    params: [],
    body: [
      {
        type: "majorOrEqual",
        keys: ["original_end_date", "original_start_date"],
      },
      {
        type: "majorOrEqual",
        keys: ["real_end_date", "real_start_date"],
      },
    ],
  },
};

export const useForm = ({ disabled, state }: IUseHookProps<Form>) => {
  const { profile, user } = useUserAuth();

  const defaultValues: Partial<Form> = {
    version: null,
    original_start_date: null,
    original_end_date: null,
    real_start_date: null,
    real_end_date: null,
    owner_id: profile?.id,
  };

  const fields: Field<Form>[] = [
    {
      field: "numeric",
      name: "version",
      label: "version",
      required: true,
      disabled,
    },
    {
      field: "input",
      name: "name",
      label: "name",
      disabled,
    },
    {
      field: "calendar",
      name: "original_start_date",
      label: "original_start_date",
      disabled,
    },
    {
      field: "calendar",
      name: "original_end_date",
      label: "original_end_date",
      disabled,
    },
    {
      field: "calendar",
      name: "real_start_date",
      label: "real_start_date",
      disabled,
    },
    {
      field: "calendar",
      name: "real_end_date",
      label: "real_end_date",
      disabled,
    },
    {
      field: "select-simple-infinity",
      name: "owner_id",
      label: "responsible",
      className: "col-span-2",
      disabled: false,
      required: true,
      cacheKey: "profile_infinity",
      request: profileIndex,
      formatter: (items: profile[]) =>
        items?.map((item) => ({
          label: item.user?.name || item.anonymous_name || item.id,
          value: item.id,
          item,
        })) || [],
      fallbackValue:
        state?.item?.owner?.user?.name || state?.item?.owner?.anonymous_name || user?.name,
      enabledOnOpen: true,
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state.item,
    defaultValues,
  });

  const watched = useWatch({
    control: form.hook.control,
    name: ["original_end_date", "original_start_date", "real_end_date", "real_start_date"],
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
