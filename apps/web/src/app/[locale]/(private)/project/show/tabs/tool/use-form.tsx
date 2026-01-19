import { useEffect } from "react";

import { useLocale } from "next-intl";

import { useWatch } from "react-hook-form";

import { index as indexProjectVersion } from "@repo/api/web/req/project_version";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { project_tool, project_version } from "@repo/types";
import { getDefaultCurrencyByLocale } from "@repo/utils/currency";

import { useConstants } from "@/hooks/constants";
import { IUseHookProps } from "@/templates/card-crud/type";
import { Shallow } from "@/types/shallowType";

type Form = Shallow<project_tool>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "project_version_id",
      method: "string",
      coerse: "string",
      model: "project_version",
      column: "id",
    },
    {
      key: "title",
      method: "string",
      coerse: "string",
    },
    {
      key: "description",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "currency",
      method: "string",
      coerse: "string",
    },
    {
      key: "value",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "recurrence",
      method: "enumeric",
      coerse: "string",
      optional: false,
      values: ["month", "week", "year", "day", "no_recurrence"],
    },
    {
      key: "start_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "end_date",
      method: "date",
      coerse: "Date",
      optional: true,
      nullable: true,
    },
    {
      key: "consumption",
      method: "enumeric",
      coerse: "string",
      values: ["daily", "integral"],
    },
    {
      key: "type",
      method: "enumeric",
      coerse: "string",
      values: ["tool", "material"],
    },
  ],
  relations: {
    query: [],
    params: [],
    body: [
      {
        type: "majorOrEqual",
        keys: ["end_date", "start_date"],
      },
    ],
  },
};

export const useForm = ({ disabled, state, data }: IUseHookProps<Form>) => {
  const locale = useLocale();
  const { recurrenceTypeWithoutNo, consumptionType, toolsTypes } = useConstants();

  const defaultValues: Partial<Form> = {
    currency: getDefaultCurrencyByLocale(locale),
    recurrence: "no_recurrence",
    type: "tool",
  };

  const fields: Field<Form>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      disabled,
    },
    {
      field: "money",
      name: "value",
      label: "value",
      required: true,
      disabled,
    },
    {
      field: "infinity_select",
      name: "project_version_id",
      label: "project_version_id",
      disabled,
      required: true,
      cacheKey: "project_version_infinity",
      request: indexProjectVersion,
      queryParams: {
        project_id: data?.id,
        orderKey: "createdAt",
        orderValue: "desc",
      },
      formatter: (items: project_version[]) =>
        items?.map((projectVersion) => ({
          label: `V${projectVersion.version}`,
          value: projectVersion.id,
          item: projectVersion,
        })) || [],
      fallbackValue: state?.item?.project_version
        ? `V${state?.item?.project_version?.version}`
        : undefined,
    },
    {
      field: "select",
      name: "recurrence",
      label: "recurrence",
      required: true,
      disabled,
      options: recurrenceTypeWithoutNo,
      className: "col-span-1",
    },
    {
      field: "select",
      name: "consumption",
      label: "consumption",
      required: true,
      disabled,
      options: consumptionType,
      className: "col-span-1",
    },
    {
      field: "select",
      name: "type",
      label: "type",
      required: true,
      className: "col-span-1",
      disabled,
      options: toolsTypes,
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      disabled,
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      disabled,
    },
    {
      field: "textarea",
      name: "description",
      label: "description",
      className: "col-span-2",
      disabled,
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state?.item,
    defaultValues,
  });

  const watched = useWatch({
    control: form.hook.control,
    name: ["end_date", "start_date"],
  });

  useEffect(() => {
    form.hook.clearErrors();
  }, watched);
  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        const key = field.name;

        switch (key) {
          case "value":
            return {
              ...field,
              currency: form.hook.watch("currency"),
              onCurrencyChange: (currency: string) => {
                form?.hook?.setValue("currency", currency);
              },
            };

          case "start_date":
          case "end_date":
            return {
              ...field,
              disabled: form.hook.watch("recurrence") === "no_recurrence",
            };
          default:
            return field;
        }
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
