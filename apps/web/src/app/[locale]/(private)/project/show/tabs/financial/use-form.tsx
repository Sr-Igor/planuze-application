import { useLocale } from "next-intl";

import { IValidatorRequest } from "@deviobr/validator";

import { project_financial, project_version, work_type } from "@repo/types";

import { index as indexProjectVersion } from "@repo/api/web/req/project_version";
import { index as indexWorkType } from "@repo/api/web/req/work_type";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-crud/type";
import { Shallow } from "@/types/shallowType";
import { getDefaultCurrencyByLocale } from "@repo/utils/currency";

type Form = Shallow<project_financial>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "work_type_id",
      method: "string",
      coerse: "string",
      model: "work_type",
      column: "id",
    },
    {
      key: "title",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "cycles",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "total_value",
      method: "numeric",
      coerse: "number",
      int: false,
    },
    {
      key: "discount",
      method: "numeric",
      coerse: "number",
      optional: true,
      nullable: true,
      int: false,
    },
    {
      key: "project_version_id",
      method: "string",
      coerse: "string",
      model: "project_version",
      column: "id",
    },
    {
      key: "currency",
      method: "string",
      coerse: "string",
    },
  ],
};

export const useForm = ({ disabled, state, data }: IUseHookProps<Form>) => {
  const locale = useLocale();

  const defaultValues: Partial<Form> = {
    cycles: null,
    currency: getDefaultCurrencyByLocale(locale),
  };

  const fields: Field<Form>[] = [
    {
      field: "infinity_select",
      name: "work_type_id",
      label: "work_type_id",
      required: true,
      disabled,
      cacheKey: "work_type_infinity",
      request: indexWorkType,
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
      field: "input",
      name: "title",
      label: "title",
      disabled,
    },
    {
      field: "numeric",
      name: "cycles",
      label: "cycles",
      required: true,
      disabled,
    },
    {
      field: "money",
      name: "total_value",
      label: "total_value",
      required: true,
      disabled,
    },
    {
      field: "percentage",
      name: "discount",
      label: "discount",
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
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state?.item,
    defaultValues,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        if (field.name !== "total_value") return field;

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
