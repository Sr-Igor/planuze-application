import { profileIndex } from "@repo/api/web";
import { Field, IValidatorRequest, Shallow, useFormList } from "@repo/form";
import { profile, project_member } from "@repo/types";

import { IUseHookProps } from "@/templates/card-crud/type";

type Form = Shallow<project_member>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "profile_id",
      method: "string",
      coerse: "string",
      model: "profile",
      column: "id",
    },
  ],
};

export const useForm = ({ disabled, state, indexData }: IUseHookProps<Form>) => {
  const defaultValues: Partial<Form> = {};

  const fields: Field<Form>[] = [
    {
      field: "select-simple-infinity",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-2",
      required: true,
      disabled,
      cacheKey: "profile_infinity",
      request: profileIndex,
      formatter: (items: profile[]) =>
        items
          ?.filter((profile) => !indexData?.some((item: any) => item.profile_id === profile.id))
          ?.map((profile) => ({
            label: profile.user?.name || profile.anonymous_name || "",
            value: profile.id,
            item: profile,
          })) || [],
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: state?.item,
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
