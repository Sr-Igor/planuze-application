import { IValidatorRequest } from "@deviobr/validator";

import { client, project } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { index } from "@repo/api/web/req/client";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";

export interface IUseFormProps {
  data?: Partial<project>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
  const t = useLang();

  const schema: IValidatorRequest = {
    body: [
      {
        key: "name",
        method: "string",
        coerse: "string",
      },
      {
        key: "client_id",
        method: "string",
        coerse: "string",
        model: "client",
        column: "id",
        optional: true,
        nullable: true,
      },
    ],
  };

  const fields: Field<Partial<project>>[] = [
    {
      field: "input",
      name: "name",
      label: "name",
      required: true,
      disabled,
      className: "col-span-1",
    },
    {
      field: "infinity_select",
      name: "client_id",
      label: "client",
      disabled,
      className: "col-span-1",
      cacheKey: "client_infinity",
      fallbackValue: data?.client?.name,
      request: index,
      formatter: (items: client[]) =>
        items?.map((client) => ({
          label: client.name,
          value: client.id,
          item: client,
        })) || [],
    },
  ];

  const form = useFormList<Partial<project>>({
    fields,
    schema,
    values: data,
  });

  return {
    ...form,
    config: {
      schema,
      fields,
    },
  };
};
