import { useLocale } from "next-intl";

import { projectFinancialIndex, roleIndex } from "@repo/api/web";
import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import { project_financial, project_financial_employees, role } from "@repo/types";
import { getDefaultCurrencyByLocale } from "@repo/utils/currency";

import { IUseHookProps } from "@/templates/card-crud/type";

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
      field: "select-simple-infinity",
      name: "project_financial_id",
      label: "project_financial_id",
      required: true,
      disabled,
      cacheKey: "project_financial_infinity",
      request: projectFinancialIndex,
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
      field: "select-simple-infinity",
      name: "role_id",
      label: "role_id",
      required: true,
      disabled,
      cacheKey: "role_infinity",
      request: roleIndex,
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
