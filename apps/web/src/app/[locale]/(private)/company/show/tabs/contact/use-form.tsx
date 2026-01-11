import { useEffect, useState } from "react";

import { IValidatorRequest } from "@deviobr/validator";

import { useLang } from "@repo/language/hook";

import { company_document } from "@/api/generator/types";
import { useConstants } from "@/hooks/constants";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export type FormType = {
  type?: string;
  register?: string;
};

const defaultValues: FormType = {
  type: "email",
  register: "",
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "type",
      method: "string",
      coerse: "string",
    },
    {
      key: "register",
      method: "string",
      coerse: "string",
    },
  ],
};

export const useForm = ({ disabled, item }: IUseHookProps<company_document> = {}) => {
  const t = useLang();

  const { contactType } = useConstants();
  const fields: Field<FormType>[] = [
    {
      field: "select",
      name: "type",
      ref_key: "type",
      label: "type_of_contact",
      required: true,
      options: contactType,
      disabled,
    },
    {
      field: "phone",
      ref_key: "phone",
      name: "register",
      label: "phone",
      required: true,
      disabled,
    },
    {
      field: "input",
      ref_key: "email",
      name: "register",
      label: "email",
      required: true,
      disabled,
    },
    {
      field: "input",
      ref_key: "string",
      name: "register",
      label: "register",
      required: true,
      disabled,
    },
  ];

  const [wKey, setWKey] = useState<string | undefined>(item?.type || defaultValues?.type);

  const bodySchema = schema.body?.map((i) => {
    return i.key === "register" ? { ...i, method: wKey || "string" } : i;
  }) as IValidatorRequest["body"];

  const form = useFormList({
    fields,
    schema: { body: bodySchema },
    values: { ...defaultValues, ...item },
    defaultValues,
  });

  const type = form.hook.watch("type");

  useEffect(() => {
    if (item?.type !== type) form.hook.setValue("register", "");
    else form.hook.reset(item);
    form.hook.clearErrors();
    setWKey(type || defaultValues.type);
  }, [type]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.filter((field) => {
        if (field.ref_key !== "type" && field.ref_key !== type) return false;
        else return true;
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
