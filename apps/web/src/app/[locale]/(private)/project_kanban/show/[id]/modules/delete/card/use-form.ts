"use client";

import { projectKanbanCycleCardIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { project_kanban_cycle_card } from "@repo/types";

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
      field: "select-simple-infinity",
      name: "card_id",
      label: "move_to",
      className: "col-span-2",
      disabled,
      required: true,
      cacheKey: "project_kanban_cycle_card_infinity",
      request: (filters: any) =>
        projectKanbanCycleCardIndex({
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
