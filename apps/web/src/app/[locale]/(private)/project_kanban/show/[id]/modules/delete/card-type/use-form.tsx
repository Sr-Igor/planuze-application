"use client";

import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { project_kanban_cycle_card_type } from "@repo/types";

import { AppCardTypeSelector } from "@/components/app-card-type-selector";

import { useKanbanShow } from "../../../context";

export interface FormValues {
  project_kanban_cycle_card_type_id?: string | null;
}

export interface IUseFormProps {
  disabled: boolean;
  item?: Partial<project_kanban_cycle_card_type>;
}

export const useForm = ({ disabled, item }: IUseFormProps) => {
  const { data } = useKanbanShow();

  const defaultValues: Partial<FormValues> = {
    project_kanban_cycle_card_type_id: null,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_kanban_cycle_card_type_id",
        method: "string",
        coerse: "string",
        model: "kanban_cycle",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<FormValues>>[] = [
    {
      field: "select",
      name: "project_kanban_cycle_card_type_id",
      label: "project_kanban_cycle_card_type_id",
      className: "col-span-2",
      disabled,
      required: true,
      formatterOptions: ({ item }) => {
        return <AppCardTypeSelector item={item} />;
      },
      customSelect: (item) => {
        return item && <AppCardTypeSelector item={item} />;
      },
      options:
        data.cardsTypes
          ?.filter((i) => i.id !== item?.id)
          ?.map((cardType) => ({
            label: cardType.title,
            value: cardType.id,
            item: cardType,
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
