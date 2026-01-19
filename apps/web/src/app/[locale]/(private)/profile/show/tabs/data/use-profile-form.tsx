import { useEffect, useState } from "react";

import { index } from "@repo/api/web/req/level";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { level, profile } from "@repo/types";

import { useConstants } from "@/hooks/constants";
import { Shallow } from "@/types/shallowType";

export type FormType = {
  id?: string | null;
  active?: boolean | null;
  level_id?: string | null;
  type?: string | null;
  entity?: string | null;
  phone?: string | null;
  owner?: boolean | null;
  level?: level | null;
};

export type ShallowForm = Shallow<FormType>;

export interface IUseFormProps {
  data?: Partial<FormType>;
  disabled?: boolean;
  profile?: profile;
}

const defaultValues = {
  active: true,
  level_id: null,
  type: null,
  entity: null,
  phone: null,
};

type DocType = "cpf" | "cnpj" | undefined;

export const useProfileForm = ({ data, disabled, profile }: IUseFormProps) => {
  const [wKey, setWKey] = useState<DocType>(data?.type as DocType);

  const { brazilDocumentType } = useConstants();

  const schema: IValidatorRequest = {
    body: [
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
        nullable: false,
        optional: true,
      },
      {
        key: "type",
        method: "enumeric",
        coerse: "string",
        values: ["cnpj", "cpf"],
        optional: true,
        nullable: true,
      },
      {
        key: "entity",
        method: wKey || "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "phone",
        method: "phone",
        coerse: "string",
        nullable: true,
        optional: true,
      },
      {
        key: "level_id",
        method: "string",
        coerse: "string",
        optional: true,
        model: "level",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<FormType>>[] = [
    {
      field: "infinity_select",
      name: "level_id",
      label: "level_id",
      className: "col-span-1",
      disabled: !!data?.owner || disabled,
      required: true,
      fallbackValue: data?.level?.title,
      cacheKey: "level_infinity",
      request: index,
      formatter: (items: level[]) =>
        items?.map((level) => ({
          label: level.title,
          value: level.id,
          item: level,
        })) || [],
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      className: "col-span-1",
      disabled: !!data?.owner || disabled || data?.id === profile?.id,
    },
    {
      field: "select",
      name: "type",
      label: "type_of_document",
      className: "col-span-1",
      disabled,
      options: brazilDocumentType,
    },
    {
      field: wKey || "input",
      name: "entity",
      label: wKey || "document",
      className: "col-span-1",
      disabled,
    },
    {
      field: "phone",
      name: "phone",
      label: "phone",
      className: "col-span-1",
      disabled,
    },
  ];

  const form = useFormList<Partial<ShallowForm>>({
    fields,
    schema,
    values: data,
    defaultValues,
  });

  const type = form.hook.watch("type");

  useEffect(() => {
    if (data?.type !== type) form.hook.setValue("entity", "");
    else form.hook.reset(data);
    form.hook.clearErrors();
    setWKey(type);
  }, [type]);

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
