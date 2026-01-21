import { Field, IValidatorRequest, useFormList } from "@repo/form";

export type FormType = {
  current_password?: string;
};

export interface IUseFormProps {
  disabled?: boolean;
}

export const useDestroyForm = ({ disabled }: IUseFormProps) => {
  const schema: IValidatorRequest = {
    body: [
      {
        key: "current_password",
        coerse: "string",
        method: "string",
      },
    ],
  };

  const fields: Field<FormType>[] = [
    {
      field: "input",
      type: "password",
      name: "current_password",
      label: "current_password",
      required: true,
      className: "col-span-3",
      disabled,
    },
  ];

  const form = useFormList<FormType>({ fields, schema });

  return {
    ...form,
    config: {
      schema,
      fields,
    },
  };
};
