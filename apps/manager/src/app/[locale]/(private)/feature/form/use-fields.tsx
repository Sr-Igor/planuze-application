"use client";

import { Field, IValidatorRequest } from "@repo/form";

export type FormType = {
  title?: string;
  deleted?: boolean;
  module_id?: string;
  path?: string;
  sidebar?: boolean;
  icon?: string | null;
  order?: number;
  group?: string | null;
  reference?: string | null;
  route?: string | null;
  new?: boolean;
  show_plan?: boolean;
  plan_title?: string;
};

export interface iUseFieldsProps {
  disabled?: boolean;
  modulesOptions?: { label: string; value: string }[];
}

export const useFields = ({ disabled = false, modulesOptions = [] }: iUseFieldsProps) => {
  const defaultValues: FormType = {
    deleted: false,
    sidebar: false,
    show_plan: false,
    new: false,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "path",
        method: "string",
        coerse: "string",
      },
      {
        key: "sidebar",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
      {
        key: "icon",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "deleted",
        method: "boolean",
        coerse: "boolean",
      },
      {
        key: "order",
        method: "numeric",
        coerse: "number",
      },
      {
        key: "group",
        method: "string",
        coerse: "string",
        nullable: true,
        optional: true,
      },
      {
        key: "reference",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
      {
        key: "route",
        method: "string",
        coerse: "string",
        nullable: true,
        optional: true,
      },
      {
        key: "show_plan",
        method: "boolean",
        coerse: "boolean",
      },
      {
        key: "plan_title",
        method: "string",
        coerse: "string",
      },
      {
        key: "module_id",
        method: "string",
        coerse: "string",
        model: "module",
        column: "id",
      },
      {
        key: "new",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "path",
      label: "path",
      required: true,
      disabled,
      className: "col-span-4",
    },
    {
      field: "select",
      name: "module_id",
      label: "module_id",
      required: true,
      disabled,
      options: modulesOptions,
      className: "col-span-4",
    },
    {
      field: "icon",
      name: "icon",
      label: "icon",
      required: true,
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "order",
      label: "order",
      required: true,
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "group",
      label: "group",
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "reference",
      label: "reference",
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "route",
      label: "route",
      disabled,
      className: "col-span-4",
    },
    {
      field: "input",
      name: "plan_title",
      label: "plan_title",
      required: true,
      disabled,
      className: "col-span-4",
    },
    {
      field: "switch",
      name: "deleted",
      label: "deleted",
      disabled,
      className: "col-span-3",
    },
    {
      field: "switch",
      name: "sidebar",
      label: "sidebar",
      disabled,
      className: "col-span-3",
    },
    {
      field: "switch",
      name: "show_plan",
      label: "show_plan",
      disabled,
      className: "col-span-3",
    },
    {
      field: "switch",
      name: "new",
      label: "new",
      disabled,
      className: "col-span-3",
    },
  ];

  return { schema, fields, defaultValues };
};
