import { IValidatorRequest } from "@deviobr/validator";
import { z } from "zod";

import { profile, user } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { useConstants } from "@/hooks/constants";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";

export type FormType = {
  avatar?: string | File | Blob | null;
  name?: string;
  email?: string;
  createdAt?: string;
  provider?: string;
  default_profile_id?: string | null;
};

export interface IUseFormProps {
  data?: Partial<user> | null;
  disabled?: boolean;
  profiles?: profile[] | null;
}

export const useForm = ({ data, disabled, profiles }: IUseFormProps) => {
  const t = useLang();

  const { providerType } = useConstants();

  const defaultValues = {
    avatar: null,
  };

  const profileOptions =
    profiles?.map((profile) => ({
      label: profile.company?.name || "Unknown",
      value: profile.id,
    })) || [];

  const schema: IValidatorRequest = {
    body: [
      {
        key: "name",
        method: "string",
        coerse: "string",
      },
      {
        key: "avatar",
        optional: true,
        coerse: "File",
        custom: z.union([z.instanceof(File), z.string(), z.null()]),
      },
      {
        key: "default_profile_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "avatar",
      name: "avatar",
      path: "user/avatar",
      publicFile: true,
      className: "col-span-full",
      clearable: true,
      disabled,
    },
    {
      field: "input",
      name: "name",
      label: "name",
      required: true,
      className: "col-span-3",
      disabled,
    },
    {
      field: "input",
      name: "email",
      label: "email",
      required: true,
      className: "col-span-3",
      disabled: true,
    },
    {
      field: "calendar",
      name: "createdAt",
      label: "createdAt",
      required: true,
      className: "col-span-2",
      disabled: true,
    },
    {
      field: "select",
      name: "default_profile_id",
      label: "default_profile_id",
      tooltip: t.tooltip("default_profile_id_tooltip"),
      className: "col-span-2",
      disabled,
      options: [
        {
          label: t.helper("none"),
          value: null,
        },
        ...profileOptions,
      ],
    },
    {
      field: "select",
      name: "provider",
      label: "provider",
      required: true,
      className: "col-span-2",
      disabled: true,
      options: providerType,
    },
  ];

  const form = useFormList<FormType>({ fields, schema, values: data || {}, defaultValues });

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
