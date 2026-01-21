"use client";

import { profileIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { profile } from "@repo/types";

type Form = {
  profile_id?: string;
  current_password?: string;
};

export interface IUseFormProps {
  disabled: boolean;
  profile?: profile | null;
}

const schema: IValidatorRequest = {
  body: [
    {
      key: "profile_id",
      method: "string",
      coerse: "string",
      model: "profile",
      column: "id",
    },
    {
      key: "current_password",
      method: "string",
      coerse: "string",
    },
  ],
};

export const useForm = ({ disabled, profile }: IUseFormProps) => {
  const defaultValues: Partial<Form> = {};

  const fields: Field<Form>[] = [
    {
      field: "select-simple-infinity",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-2",
      required: true,
      disabled,
      cacheKey: "profile_infinity",
      request: profileIndex,
      formatter: (items: profile[]) =>
        items
          ?.filter((p) => p.id !== profile?.id)
          ?.map((p) => ({
            label: p.user?.name || "",
            value: p.id,
            item: p,
          })) || [],
    },
    {
      field: "input",
      name: "current_password",
      label: "current_password",
      required: true,
      type: "password",
      className: "col-span-2",
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
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
