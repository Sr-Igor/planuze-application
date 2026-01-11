"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { profile } from "@repo/api/generator/types";

import { index } from "@/api/req/profile";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

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
      field: "infinity_select",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-2",
      required: true,
      disabled,
      cacheKey: "profile_infinity",
      request: index,
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
