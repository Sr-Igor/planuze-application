import { useEffect } from "react";

import { useLocale } from "next-intl";

import { IValidatorRequest } from "@deviobr/validator";

import { project_financial, project_financial_employees, role } from "@repo/api/generator/types";

import { index as indexProjectFinancial } from "@/api/req/project_financial";
import { index as indexRole } from "@/api/req/role";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-crud/type";
import { Shallow } from "@/types/shallowType";
import { getDefaultCurrencyByLocale } from "@repo/utils/currency";

type Form = Shallow<project_financial_employees>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "project_financial_id",
      method: "string",
      coerse: "string",
      model: "project_financial",
      column: "id",
    },
    {
      key: "quantity",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "unit_value",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "currency",
      method: "string",
      coerse: "string",
    },
    {
      key: "role_id",
      method: "string",
      coerse: "string",
      model: "role",
      column: "id",
    },
  ],
};

export const useForm = ({ disabled, state, data }: IUseHookProps<Form>) => {
  const locale = useLocale();

  const defaultValues: Partial<Form> = {
    quantity: null,
    currency: getDefaultCurrencyByLocale(locale),
  };

  const fields: Field<Form>[] = [
    {
      field: "infinity_select",
      name: "project_financial_id",
      label: "project_financial_id",
      required: true,
      disabled,
      cacheKey: "project_financial_infinity",
      request: indexProjectFinancial,
      queryParams: {
        orderKey: "createdAt",
        orderValue: "desc",
        project_id: data?.id,
      },
      formatter: (items: project_financial[]) =>
        items?.map((projectFinancial) => ({
          label: `${projectFinancial.work_type?.title} (V${projectFinancial.project_version?.version}) ${projectFinancial.title ? `- ${projectFinancial.title}` : ""}`,
          value: projectFinancial.id,
          item: projectFinancial,
        })) || [],
      fallbackValue: state?.item?.project_financial
        ? `${state?.item?.project_financial?.work_type?.title} (V${state?.item?.project_financial?.project_version?.version}) ${state?.item?.project_financial?.title ? `- ${state?.item?.project_financial?.title}` : ""}`
        : undefined,
    },
    {
      field: "numeric",
      name: "quantity",
      label: "quantity",
      required: true,
      disabled,
    },
    {
      field: "infinity_select",
      name: "role_id",
      label: "role_id",
      required: true,
      disabled,
      cacheKey: "role_infinity",
      request: indexRole,
      queryParams: {
        orderKey: "title",
        orderValue: "asc",
      },
      formatter: (items: role[]) =>
        items?.map((role) => ({
          label: role.title,
          value: role.id,
          item: role,
        })) || [],
      fallbackValue: state?.item?.role?.title,
      onChangeCallback: (item: role) => {
        item && form.hook.setValue("unit_value", item?.pay);
      },
    },

    {
      field: "money",
      name: "unit_value",
      label: "unit_value",
      required: true,
      disabled,
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state.item,
    defaultValues,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        if (field.name !== "unit_value") return field;

        return {
          ...field,
          currency: form.hook.watch("currency"),
          onCurrencyChange: (currency: string) => {
            form?.hook?.setValue("currency", currency);
          },
        };
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
