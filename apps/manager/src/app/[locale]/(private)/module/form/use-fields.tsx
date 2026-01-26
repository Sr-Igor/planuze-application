"use client";

import * as icons from "lucide-react";

import { Field, IValidatorRequest } from "@repo/form";
import { company } from "@repo/types";

export type FormType = {
  title: string;
  deleted: boolean;
  icon?: string | null;
  company_id?: string | null;
  order?: number | null;
  basic: boolean;
  integration: boolean;
};

export interface iUseFieldsProps {
  disabled?: boolean;
  companies?: company[];
}

export const useFields = ({ disabled = false, companies }: iUseFieldsProps) => {
  const defaultValues: FormType = {
    title: "",
    deleted: false,
    icon: undefined,
    company_id: undefined,
    order: undefined,
    basic: false,
    integration: false,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "icon",
        method: "string",
        coerse: "string",
      },
      {
        key: "order",
        method: "numeric",
        coerse: "number",
      },
      {
        key: "company_id",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "deleted",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "basic",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "integration",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const iconOptions = Object.keys(icons).map((icon) => ({
    label: icon,
    value: icon,
  }));

  const fields: Field<FormType>[] = [
    {
      field: "icon",
      name: "icon",
      label: "icon",
      required: true,
      disabled,
      className: "col-span-2",
      options: iconOptions,
    },
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "select",
      name: "company_id",
      label: "company",
      disabled,
      className: "col-span-1",
      options: [
        { label: "Todas", value: null },
        ...(companies?.map((company) => ({
          label: company.name,
          value: company.id,
        })) || []),
      ],
    },
    {
      field: "switch",
      name: "deleted",
      label: "deleted",
      disabled,
      className: "col-span-1",
    },
    {
      field: "input",
      name: "order",
      label: "order",
      required: true,
      disabled,
      type: "number",
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "basic",
      label: "basic",
      disabled,
      className: "col-span-1",
    },
    {
      field: "switch",
      name: "integration",
      label: "integration",
      disabled,
      className: "col-span-1",
    },
  ];

  return { schema, fields, defaultValues };
};
