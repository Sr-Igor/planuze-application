import { useEffect } from "react";

import { IBank } from "@repo/api/global/bank";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { profile_bank_account } from "@repo/types";

import { useConstants } from "@/hooks/constants";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { Shallow } from "@/types/shallowType";

type Form = Partial<Shallow<profile_bank_account>>;

export const useForm = ({ disabled, item }: IUseHookProps<profile_bank_account> = {}) => {
  const schema: IValidatorRequest = {
    body: [
      {
        key: "country",
        method: "string",
        coerse: "string",
      },
      {
        key: "bank_number",
        method: "string",
        coerse: "string",
        nullable: true,
        optional: true,
      },
      {
        key: "bank_name",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "account",
        method: "string",
        coerse: "string",
      },
      {
        key: "digit",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },

      {
        key: "type",
        method: "string",
        coerse: "string",
      },
      {
        key: "principal",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "comment",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "agency",
        method: "string",
        coerse: "string",
      },
    ],
  };

  const { accountTypes } = useConstants();
  const defaultValues: Partial<Form> = {
    country: "Brazil",
    principal: false,
  };

  const fields: Field<Form>[] = [
    {
      field: "country",
      name: "country",
      label: "country",
      disabled,
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "principal",
      label: "principal",
      disabled,
      className: "col-span-1",
    },
    {
      field: "bank",
      name: "bank_number",
      label: "bank_number",
      disabled,
      int: true,
      className: "col-span-1",
      changeCallback: (bank: IBank | null) => {
        form.hook.setValue("bank_name", bank?.name || "");
      },
    },
    {
      field: "input",
      name: "bank_name",
      label: "bank_name",
      disabled,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "account",
      label: "account",
      disabled,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "digit",
      label: "digit",
      disabled,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "agency",
      label: "agency",
      disabled,
      className: "col-span-1",
    },

    {
      field: "select",
      name: "type",
      label: "type",
      disabled,
      className: "col-span-1",
      options: accountTypes,
    },

    {
      field: "textarea",
      name: "comment",
      label: "comment",
      disabled,
      className: "col-span-2",
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: item,
    defaultValues,
  });

  const country = form.hook.watch("country");

  useEffect(() => {
    if (!form.isDirty) return;

    form.hook.setValue("bank_number", "");
    form.hook.setValue("bank_name", "");
  }, [country]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      onlyRead: true,
      fields: form.formProps.fields.map((field) => {
        const key = field.name;

        switch (key) {
          case "bank_number":
            return {
              ...field,
              field: country === "Brazil" ? "bank" : "numeric",
            };
          default:
            return field;
        }
      }) as Field<Form>[],
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
