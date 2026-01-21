import { clientIndex } from "@repo/api/web";
import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { client, project } from "@repo/types";

export interface IUseFormProps {
  data?: Partial<project>;
  disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
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
      field: "select-simple-infinity",
      name: "client_id",
      label: "client",
      disabled,
      className: "col-span-1",
      cacheKey: "client_infinity",
      fallbackValue: data?.client?.name,
      request: clientIndex,
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
