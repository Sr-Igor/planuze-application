"use client";

import { useLocale } from "next-intl";

import { companyEndpoint } from "@repo/api/manager";
import { Field, IValidatorRequest, Shallow } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { company, plan } from "@repo/types";
import { getDefaultCurrencyByLocale } from "@repo/utils";

export type FormType = Shallow<plan>;

export interface iUseFieldsProps {
  item?: plan | null;
  disabled?: boolean;
  deleted?: boolean;
}

export const useFields = ({ disabled = false, item }: iUseFieldsProps) => {
  const t = useLang();
  const locale = useLocale();

  const defaultValues: Partial<FormType> = {
    is_popular: false,
    price: null,
    licenses: null,
    deleted: false,
    free_test: null,
    currency: getDefaultCurrencyByLocale(locale),
  };

  const generalSchema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "licenses",
        method: "numeric",
        coerse: "number",
        optional: true,
        positive: true,
        nullable: true,
      },
      {
        key: "company_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "icon",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },

      {
        key: "order",
        method: "numeric",
        coerse: "number",
        int: true,
        positive: true,
      },
      {
        key: "deleted",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const generalFields: Field<FormType>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "icon",
      name: "icon",
      label: "icon",
      required: true,
      disabled,
      className: "col-span-2",
    },
    {
      field: "input",
      name: "order",
      label: "order",
      type: "number",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "select-simple-infinity",
      name: "company_id",
      label: "company",
      required: true,
      disabled,
      className: "col-span-1",
      cacheKey: "company_infinity",
      fallbackValue: item?.company?.name,
      request: companyEndpoint.index,
      formatter: (items: company[]) =>
        items?.map((company) => ({
          label: company.name,
          value: company.id,
          item: company,
        })) || [],
    },
    {
      field: "input",
      name: "licenses",
      label: "licenses",
      type: "number",
      disabled,
      tooltip: t.page.plans("show.infos.licenses"),
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "deleted",
      label: "deleted",
      disabled,
      className: "col-span-1",
    },
  ];

  const freeSchema: IValidatorRequest = {
    body: [
      {
        key: "free_test",
        method: "numeric",
        coerse: "number",
        positive: true,
      },
    ],
  };

  const freeFields: Field<FormType>[] = [
    {
      field: "input",
      name: "free_test",
      label: "free_test",
      type: "number",
      required: true,
      disabled,
      tooltip: t.page.plans("show.infos.free_test"),
    },
  ];

  const paidSchema: IValidatorRequest = {
    body: [
      {
        key: "price",
        method: "numeric",
        coerse: "number",
        positive: true,
      },
      {
        key: "currency",
        method: "string",
        coerse: "string",
      },
      {
        key: "billing_model",
        method: "enumeric",
        coerse: "string",
        values: ["yearly", "monthly"],
        optional: false,
      },

      {
        key: "is_popular",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const paidFields: Field<FormType>[] = [
    {
      field: "money",
      name: "price",
      label: "price",
      disabled,
      required: true,
    },
    {
      field: "select",
      name: "billing_model",
      label: "billing_model",
      required: true,
      disabled,
      options: [
        { value: "yearly", label: t.helper("yearly") },
        { value: "monthly", label: t.helper("monthly") },
      ],
    },
    {
      field: "switch",
      name: "is_popular",
      label: "is_popular",
      disabled,
    },
  ];

  return {
    generalSchema,
    generalFields,
    freeSchema,
    freeFields,
    paidSchema,
    paidFields,
    defaultValues,
  };
};
