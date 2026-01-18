import { IValidatorRequest } from "@deviobr/validator";

import { kanban_template_column } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export type FormType = {
  title?: string;
  order?: number;
  finished?: boolean;
  description?: string | null;
};

const defaultValues: Partial<FormType> = {
  finished: false,
  description: "",
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "title",
      method: "string",
      coerse: "string",
    },
    {
      key: "order",
      method: "numeric",
      coerse: "number",
    },
    {
      key: "finished",
      method: "boolean",
      coerse: "boolean",
      optional: true,
    },
    {
      key: "description",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
  ],
};

export const useForm = ({ disabled, item }: IUseHookProps<kanban_template_column> = {}) => {
  const t = useLang();

  const fields: Field<FormType>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      className: "col-span-2",
      disabled,
    },
    {
      field: "switch",
      name: "finished",
      label: "finished",
      tooltip: t.tooltip("cards_moved_for_this_column_will_be_finished"),
      className: "col-span-1",
      disabled,
    },
    {
      field: "input",
      name: "description",
      label: "description",
      required: true,
      className: "col-span-3",
      disabled,
    },
  ];

  const form = useFormList({
    fields,
    schema,
    values: item,
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
