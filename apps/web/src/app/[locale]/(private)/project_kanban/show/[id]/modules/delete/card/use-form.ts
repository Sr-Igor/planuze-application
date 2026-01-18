"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle_card } from "@repo/types";

import { index } from "@repo/api/web/req/project_kanban_cycle_card";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";

export interface FormValues {
  card_id?: string | null;
}

export interface IUseFormProps {
  disabled: boolean;
  item?: project_kanban_cycle_card;
}

export const useForm = ({ disabled, item }: IUseFormProps) => {
  const defaultValues: Partial<FormValues> = {
    card_id: null,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "card_id",
        method: "string",
        coerse: "string",
      },
    ],
  };

  const fields: Field<Partial<FormValues>>[] = [
    {
      field: "infinity_select",
      name: "card_id",
      label: "move_to",
      className: "col-span-2",
      disabled,
      required: true,
      cacheKey: "project_kanban_cycle_card_infinity",
      request: (filters: any) =>
        index({
          ...filters,
          project_kanban_cycle_id: item?.project_kanban_cycle_id,
          principal: true,
        }),
      formatter: (items: project_kanban_cycle_card[]) =>
        items
          ?.filter((card) => card.id !== item?.id)
          ?.map((card) => ({
            label: card.title,
            value: card.id,
            item: card,
          })) || [],
    },
  ];

  const form = useFormList<Partial<FormValues>>({
    fields,
    schema,
    defaultValues: defaultValues,
  });

  return {
    ...form,
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};
