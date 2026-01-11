import { profile_address } from "@repo/api/generator/types";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";

export type FormType = {
  street?: string | null;
  complement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | null;
  client_id?: string;
  number?: string | null;
  neighborhood?: string | null;
};

export type UseFormProps = {
  data?: Partial<profile_address>;
  disabled?: boolean;
};

export const useForm = ({ data }: UseFormProps) => {
  const fields: Field<FormType>[] = [
    {
      field: "cep",
      name: "zip_code",
      label: "zip_code",
      className: "col-span-3",
    },
    {
      field: "input",
      name: "street",
      label: "street",
      className: "col-span-3",
    },
    {
      field: "input",
      name: "neighborhood",
      label: "neighborhood",
      className: "col-span-3",
    },
    {
      field: "input",
      name: "number",
      label: "number",
      className: "col-span-3",
    },
    {
      field: "country",
      name: "country",
      label: "country",
      className: "col-span-2",
    },
    {
      field: "state",
      name: "state",
      label: "state",
      className: "col-span-2",
    },
    {
      field: "city",
      name: "city",
      label: "city",
      className: "col-span-2",
    },
    {
      field: "input",
      name: "complement",
      label: "complement",
      className: "col-span-6",
    },
  ];

  const form = useFormList<FormType>({
    fields,
    schema: {},
    values: data,
  });

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        return {
          ...field,
          country: data?.country,
          state: data?.state,
        };
      }),
    },
  };
};
