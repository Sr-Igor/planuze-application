import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { kanban_template } from "@repo/types";

export type FormType = {
  title: string;
  active: boolean;
};

export interface IUseFormProps {
  data?: Partial<kanban_template>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const defaultValues = {
    active: true,
  };

  const schema: IValidatorRequest = {
    body: [
      {
        key: "title",
        method: "string",
        coerse: "string",
      },
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const fields: Field<Partial<kanban_template>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      className: "col-span-1",
      disabled,
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      className: "col-span-1",
      disabled,
    },
  ];

  const form = useFormList<Partial<kanban_template>>({
    fields,
    schema,
    values: data,
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
