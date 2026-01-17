import { IValidatorRequest } from "@deviobr/validator";

import { project_kanban_objective_target } from "@repo/types";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";

export type FormType = {
  title?: string;
  description?: string | null;
  concluded?: boolean;
};

const defaultValues: Partial<FormType> = {
  concluded: false,
  description: null,
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "title",
      method: "string",
      coerse: "string",
    },
    {
      key: "description",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "concluded",
      method: "boolean",
      coerse: "boolean",
      optional: true,
    },
  ],
};

export const useForm = ({
  disabled,
  item,
}: IUseHookProps<project_kanban_objective_target> = {}) => {
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
      name: "concluded",
      label: "concluded",
      disabled,
    },
    {
      field: "editor",
      name: "description",
      label: "description",
      className: "col-span-3",
      inputClassName: "h-32 resize-none border-border! border-2!",
      disabled,
    },
  ];

  const form = useFormList<FormType>({
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
