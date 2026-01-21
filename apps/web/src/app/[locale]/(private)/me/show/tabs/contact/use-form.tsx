import { Field, useFormList } from "@repo/form";
import { profile_contact } from "@repo/types";

import { useConstants } from "@/hooks/constants";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export type FormType = {
  type?: string;
  register?: string;
};

export const useForm = ({ item }: IUseHookProps<profile_contact> = {}) => {
  const { contactType } = useConstants();

  const fields: Field<FormType>[] = [
    {
      field: "select",
      name: "type",
      ref_key: "type",
      label: "type_of_contact",
      options: contactType,
    },
    {
      field: "phone",
      ref_key: "phone",
      name: "register",
      label: "phone",
    },
    {
      field: "input",
      ref_key: "email",
      name: "register",
      label: "email",
    },
    {
      field: "input",
      ref_key: "string",
      name: "register",
      label: "register",
    },
  ];

  const form = useFormList({
    fields,
    schema: {},
    values: item,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      onlyRead: true,
      fields: form.formProps.fields.filter((field) => {
        if (field.ref_key !== "type" && field.ref_key !== item?.type) return false;
        else return true;
      }),
    },
  };
};
