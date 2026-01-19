import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { level } from "@repo/types";

export const defaultValues = {
  active: true,
};

export interface IUseFormProps {
  disabled: boolean;
  data?: Partial<level>;
}

export const useForm = ({ disabled, data }: IUseFormProps) => {
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
      {
        key: "description",
        method: "string",
        coerse: "string",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<level>>[] = [
    {
      field: "input",
      name: "title",
      label: "title",
      required: true,
      className: "col-span-1 md:col-span-4",
      disabled,
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      required: true,
      className: "col-span-1",
      disabled,
    },
    {
      field: "textarea",
      name: "description",
      label: "description",
      className: "col-span-1 md:col-span-5",
      inputClassName: "h-32 resize-none",
      disabled,
    },
  ];

  const form = useFormList<Partial<level>>({
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
