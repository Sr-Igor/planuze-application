"use client";

import { kanbanTemplateCardTypeIndex } from "@repo/api/web";
import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import {
  kanban_template_card,
  kanban_template_card_type,
  project_kanban_cycle_card_type,
} from "@repo/types";
import { Icon } from "@repo/ui";

import { IUseHookProps } from "@/templates/card-list/cards/register/types";

type Form = Shallow<kanban_template_card>;

const defaultValues: Partial<Form> = {
  kanban_template_card_type_id: null,
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "kanban_template_card_type_id",
      method: "string",
      coerse: "string",
      model: "kanban_template_card_type",
      column: "id",
    },
  ],
};

export const useTemplateForm = ({ disabled }: IUseHookProps<project_kanban_cycle_card_type>) => {
  const fields: Field<Form>[] = [
    {
      field: "select-simple-infinity",
      name: "kanban_template_card_type_id",
      label: "kanban_template_card_type_id",
      required: true,
      className: "col-span-2",
      disabled,
      cacheKey: "kanban_template_card_type_infinity",
      request: kanbanTemplateCardTypeIndex,
      formatter: (items: kanban_template_card_type[]) => {
        return items.map((i) => ({ label: i.title, value: i.id, item: i }));
      },
      formatterOptions: (item: kanban_template_card_type) => {
        return (
          <div className="flex w-full items-center gap-2 text-sm">
            <Icon name={item?.icon} size={16} color={item?.color || "inherit"} />
            <p className="line-clamp-1 flex-1 truncate">{item?.title}</p>
          </div>
        );
      },
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    defaultValues,
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
