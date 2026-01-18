import { profile_bonus } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { useConstants } from "@/hooks/constants";
import { useFormList } from "@repo/form";
import { Field, IUseFormListReturn } from "@repo/form";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

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
};

export const useForm = ({
  disabled,
  item,
}: IUseHookProps<profile_bonus>): IUseFormListReturn<Partial<profile_bonus>> => {
  const { payRecurrenceType } = useConstants();

  const wRecurrence = item?.recurrence || "month";

  const fields: Field<Partial<FormType>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
    },

    {
      field: "select",
      name: "recurrence",
      label: "recurrence",
      className: "col-span-1",
    },
    {
      field: "select",
      name: "payment_routine",
      label: "payment_routine",
      hide: wRecurrence !== "day" && wRecurrence !== "no_recurrence",
      options: payRecurrenceType,
    },
    {
      field: "days_of_month",
      name: "payment_routine",
      label: "payment_routine",
      hide: wRecurrence !== "month",
      days: 31,
    },
    {
      field: "days_of_year",
      name: "payment_routine",
      label: "payment_routine",
      hide: wRecurrence !== "year",
    },
    {
      field: "days_of_week",
      name: "payment_routine",
      label: "payment_routine",
      hide: wRecurrence !== "week",
    },
    {
      field: "calendar",
      name: "start_date",
      label: "payment_date",
      hide: wRecurrence !== "no_recurrence",
    },
    {
      field: "calendar",
      name: "start_date",
      label: "start_date",
      hide: wRecurrence === "no_recurrence",
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
      hide: wRecurrence === "no_recurrence",
    },
    {
      field: "money",
      name: "pay",
      label: "pay",
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<FormType>>({
    fields,
    schema: {},
    values: item,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      onlyRead: true,
      fields: form.formProps.fields.map((field) => {
        if (field.name !== "pay") return field;

        return {
          ...field,
          currency: item?.currency,
        };
      }),
    },
  };
};
