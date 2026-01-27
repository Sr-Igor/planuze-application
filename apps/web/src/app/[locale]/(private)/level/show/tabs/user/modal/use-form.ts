"use client";

import { profileIndex } from "@repo/api/web";
import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import { profile, project_member } from "@repo/types";

type Form = Shallow<project_member>;

export interface IUseFormProps {
  disabled: boolean;
  profiles: profile[];
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
  ],
};

export const useForm = ({ disabled, profiles }: IUseFormProps) => {
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
          ?.filter(
            (profile) =>
              !profiles.some((member) => member.id === profile.id) &&
              !profile.owner &&
              profile.user_id
          )
          ?.map((profile) => ({
            label: profile.user?.name || "",
            value: profile.id,
            item: profile,
          })) || [],
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
