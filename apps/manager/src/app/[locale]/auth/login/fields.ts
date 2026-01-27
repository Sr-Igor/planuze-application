import { Field, IValidatorRequest } from "@repo/form";

export type FormType = {
  email: string;
  password: string;
};

export const schema: IValidatorRequest = {
  body: [
    {
      key: "email",
      method: "email",
      coerse: "string",
    },
    {
      key: "password",
      method: "string",
      coerse: "string",
    },
  ],
};

export const fields: Field<FormType>[] = [
  {
    field: "input",
    name: "email",
    label: "email",
    required: true,
    className: "col-span-2",
  },
  {
    field: "input",
    name: "password",
    label: "password",
    type: "password",
    required: true,
    className: "col-span-2",
  },
];
