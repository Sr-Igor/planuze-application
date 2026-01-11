"use client";

import { useLocale } from "next-intl";

import { IValidatorRequest } from "@deviobr/validator";

import { cost_center, role, work_type } from "@repo/api/generator/types";

import { index as indexCostCenter } from "@/api/req/cost_center";
import { index } from "@/api/req/work_type";
import { useConstants } from "@/hooks/constants";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/list/base/types";
import { getDefaultCurrencyByLocale } from "@/utils/currency";

type FormType = {
  title?: string;
  recurrence?: string;
  pay?: number;
  active?: boolean;
  cost_center_id?: string | null;
  currency: string;
  work_type_id?: string;
};

export const useForm = ({ disabled, state }: IUseHookProps<role>) => {
  const locale = useLocale();
  const { recurrenceType } = useConstants();

  const defaultValues: Partial<FormType> = {
    title: "",
    active: true,
    recurrence: "month",
    currency: getDefaultCurrencyByLocale(locale),
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "recurrence",
        method: "enumeric",
        coerse: "string",
        optional: true,
        values: ["month", "week", "year", "day"],
      },
      {
        key: "pay",
        method: "numeric",
        coerse: "number",
        positive: true,
      },
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "cost_center_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
        model: "cost_center",
        column: "id",
      },
      {
        key: "currency",
        method: "string",
        coerse: "string",
      },
      {
        key: "work_type_id",
        method: "string",
        coerse: "string",
        model: "work_type",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<role>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "select",
      name: "recurrence",
      label: "recurrence",
      required: true,
      disabled,
      options: recurrenceType,
      className: "col-span-1",
    },
    {
      field: "money",
      name: "pay",
      label: "pay",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "infinity_select",
      name: "work_type_id",
      label: "work_type_id",
      disabled,
      required: true,
      cacheKey: "work_type_infinity",
      request: index,
      queryParams: {
        orderKey: "title",
        orderValue: "asc",
      },
      formatter: (items: work_type[]) =>
        items?.map((workType) => ({
          label: workType.title,
          value: workType.id,
          item: workType,
        })) || [],
      fallbackValue: state?.item?.work_type?.title,
    },
    {
      field: "infinity_select",
      name: "cost_center_id",
      label: "cost_center_id",
      disabled,
      cacheKey: "cost_center_infinity",
      request: indexCostCenter,
      formatter: (items: cost_center[]) =>
        items?.map((costCenter) => ({
          label: costCenter.title,
          value: costCenter.id,
          item: costCenter,
        })) || [],
      fallbackValue: state?.item?.cost_center?.title,
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      disabled,
    },
  ];

  const form = useFormList<Partial<FormType>>({
    fields,
    schema,
    values: state.item,
    defaultValues: defaultValues,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        if (field.name !== "pay") return field;

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
