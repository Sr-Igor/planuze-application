import { useEffect, useState } from "react";

import { useLocale } from "next-intl";

import { IValidatorRequest } from "@deviobr/validator";
import { useWatch } from "react-hook-form";

import { useLang } from "@repo/language/hook";

import { cost_center, profile_bonus } from "@/api/generator/types";
import { index as indexCostCenter } from "@/api/req/cost_center";
import { useConstants } from "@/hooks/constants";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { getDefaultCurrencyByLocale } from "@/utils/currency";

type FormType = {
  title?: string;
  profile_id?: string;
  currency?: string;
  pay?: number;
  pro_rata?: boolean;
  payment_routine?: string;
  start_date?: string;
  end_date?: string | null;
  recurrence?: string;
  active?: boolean;
  cost_center_id?: string | null;
  type?: string;
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "title",
      method: "string",
      coerse: "string",
    },
    {
      key: "currency",
      method: "string",
      coerse: "string",
    },
    {
      key: "pay",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "start_date",
      method: "date",
      coerse: "Date",
    },
    {
      key: "end_date",
      method: "date",
      coerse: "Date",
      nullable: true,
      optional: true,
    },
    {
      key: "recurrence",
      method: "enumeric",
      coerse: "string",
      values: ["month", "week", "year", "day", "no_recurrence"],
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
      model: "cost_center",
      column: "id",
      optional: true,
      nullable: true,
    },
    {
      key: "payment_routine",
      method: "string",
      coerse: "string",
    },
    {
      key: "pro_rata",
      method: "boolean",
      coerse: "boolean",
      optional: true,
    },
    {
      key: "type",
      method: "enumeric",
      coerse: "string",
      values: ["bonus", "extra"],
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

const defaultValues: Partial<FormType> = {
  start_date: new Date()?.toISOString(),
  end_date: null,
  type: "bonus",
  recurrence: "no_recurrence",
  payment_routine: "unique_payment",
  active: false,
  pro_rata: false,
};

export const useForm = ({ disabled, item }: IUseHookProps<profile_bonus>) => {
  const t = useLang();
  const locale = useLocale();

  const { recurrenceTypeWithoutNo, paymentRoutine, bonusesTypes } = useConstants();

  const [wRecurrence, setWRecurrence] = useState<string>("month");

  const fields: Field<Partial<FormType>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      disabled,
    },
    {
      field: "select",
      name: "type",
      label: "type",
      required: true,
      disabled,
      options: bonusesTypes,
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
      name: "payment_routine",
      tooltip: t.tooltip("payment_routine_tooltip"),
      label: "payment_routine",
      required: true,
      hide: wRecurrence !== "day" && wRecurrence !== "no_recurrence",
      disabled: true,
      options: paymentRoutine,
    },
    {
      field: "days_of_month",
      name: "payment_routine",
      tooltip: t.tooltip("payment_routine_tooltip"),
      label: "payment_routine",
      required: true,
      hide: wRecurrence !== "month",
      days: 31,
      disabled,
    },
    {
      field: "days_of_year",
      name: "payment_routine",
      tooltip: t.tooltip("payment_routine_tooltip"),
      label: "payment_routine",
      required: true,
      hide: wRecurrence !== "year",
      disabled,
    },
    {
      field: "days_of_week",
      name: "payment_routine",
      tooltip: t.tooltip("payment_routine_tooltip"),
      label: "payment_routine",
      required: true,
      hide: wRecurrence !== "week",
      disabled,
    },
    {
      field: "calendar",
      name: "start_date",
      label: "payment_date",
      required: true,
      hide: wRecurrence !== "no_recurrence",
      disabled,
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      required: true,
      hide: wRecurrence === "no_recurrence",
      disabled,
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      hide: wRecurrence === "no_recurrence",
      disabled,
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
      fallbackValue: item?.cost_center?.title,
    },
    {
      field: "switch",
      name: "active",
      label: "show_to_profile",
      tooltip: t.tooltip("show_to_profile_tooltip"),
      disabled,
    },
    {
      field: "switch",
      name: "pro_rata",
      label: "pro_rata",
      disabled,
      tooltip: t.tooltip("pro_rata_tooltip"),
    },
  ];

  const form = useFormList<Partial<FormType>>({
    fields,
    schema,
    values: item,
    defaultValues: {
      ...defaultValues,
      currency: getDefaultCurrencyByLocale(locale),
    },
  });

  const currency = form.hook.watch("currency");
  const recurrence = form.hook.watch("recurrence");

  useEffect(() => {
    if (recurrence && recurrence !== wRecurrence) {
      setWRecurrence(recurrence);

      if (item?.recurrence === recurrence) {
        form.hook.resetField("payment_routine");
      } else if (recurrence === "day") {
        form.hook.setValue("payment_routine", "all_days");
      } else if (recurrence === "no_recurrence") {
        form.hook.setValue("payment_routine", "unique_payment");
      } else {
        //@ts-ignore
        form.hook.setValue("payment_routine", null);
      }
    }
  }, [recurrence]);

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
        if (field.name !== "pay") return field;

        return {
          ...field,
          currency,
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
