import { IValidatorRequest } from "@deviobr/validator";

import { integration } from "@repo/types";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

export const defaultValues = {
  active: true,
  expire_in: null,
};

export interface IUseFormProps {
  disabled: boolean;
  data?: Partial<integration>;
}

export const useForm = ({ disabled, data }: IUseFormProps) => {
  const schema: IValidatorRequest = {
    body: [
      {
        key: "name",
        method: "string",
        coerse: "string",
      },
      {
        key: "expire_in",
        method: "date",
        coerse: "Date",
        optional: true,
        nullable: true,
      },
      {
        key: "active",
        method: "boolean",
        coerse: "boolean",
        optional: true,
      },
    ],
  };

  const fields: Field<Partial<integration>>[] = [
    {
      field: "input",
      name: "name",
      label: "name",
      required: true,
      className: "col-span-1 md:col-span-4",
      disabled,
    },
    {
      field: "calendar",
      name: "expire_in",
      label: "expire_in",
      className: "col-span-3",
      disabled,
      disabledPast: true,
    },
    {
      field: "switch",
      name: "active",
      label: "active",
      required: true,
      className: "col-span-1",
      disabled,
    },
  ];

  const form = useFormList<Partial<integration>>({
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
