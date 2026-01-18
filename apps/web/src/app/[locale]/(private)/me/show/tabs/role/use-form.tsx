import { profile_role } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { useConstants } from "@/hooks/constants";
import { useFormList } from "@repo/form";
import { Field, IUseFormListReturn } from "@repo/form";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

type FormType = {
  role_id?: string;
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
  item,
}: IUseHookProps<profile_role>): IUseFormListReturn<Partial<profile_role>> => {
  const { payRecurrenceType } = useConstants();

  const wRecurrence = item?.recurrence || "month";

  const fields: Field<Partial<FormType>>[] = [
    {
      field: "input",
      name: "role_id",
      ref_key: "role_id",
      label: "role",
    },
    {
      field: "select",
      name: "recurrence",
      label: "recurrence",
      className: "col-span-1",
      options: payRecurrenceType,
    },
    {
      field: "select",
      name: "payment_routine",
      label: "payment_routine",
      hide: wRecurrence !== "day",
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
      label: "start_date",
    },
    {
      field: "calendar",
      name: "end_date",
      label: "end_date",
    },
    {
      field: "money",
      name: "pay",
      label: "salary",
      className: "col-span-1",
    },
  ];

  const form = useFormList<Partial<FormType>>({
    fields,
    schema: {},
    values: {
      ...item,
      role_id: item?.role?.title,
    },
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
