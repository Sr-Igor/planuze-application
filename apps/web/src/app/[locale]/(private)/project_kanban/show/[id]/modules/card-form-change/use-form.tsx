"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { AppCardTypeSelector } from "@/components/ui/app-card-type-selector";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

import { useKanbanShow } from "../../context";

interface FormValues {
  project_kanban_cycle_card_type_id?: string;
}

export interface IUseFormProps {
  disabled: boolean;
  card?: project_kanban_cycle_card;
}

export const useForm = ({ disabled, card }: IUseFormProps) => {
  const { data } = useKanbanShow();

  const cardsTypes = data.cardsTypes
    ?.filter((cardType) => cardType.id !== card?.project_kanban_cycle_card_type_id)
    ?.map((cardType) => ({
      label: cardType.title,
      value: cardType.id,
      item: cardType,
    }));

  const defaultValues: Partial<FormValues> = {};

  const schema: IValidatorRequest = {
    body: [
      {
        key: "project_kanban_cycle_card_type_id",
        method: "string",
        coerse: "string",
        model: "project_kanban_cycle_card_type",
        column: "id",
      },
    ],
  };

  const fields: Field<Partial<FormValues>>[] = [
    {
      field: "select",
      name: "project_kanban_cycle_card_type_id",
      label: "project_kanban_cycle_card_type_id",
      required: true,
      disabled,
      className: "col-span-2",
      options: cardsTypes,
      formatterOptions: ({ item }) => {
        return <AppCardTypeSelector item={item} />;
      },
      customSelect: (item) => {
        return item && <AppCardTypeSelector item={item} />;
      },
      fallbackValue: card?.project_kanban_cycle_card_type?.title,
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
