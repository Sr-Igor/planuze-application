import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { project_kanban_objective } from "@repo/types";

export type FormType = {
  title: string;
  description: string;
  concluded: boolean;
};

export interface IUseFormProps {
  data?: Partial<project_kanban_objective>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const defaultValues = {
    concluded: false,
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

  const fields: Field<Partial<project_kanban_objective>>[] = [
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
      skipHtmlFor: true,
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

  const form = useFormList<Partial<project_kanban_objective>>({
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
