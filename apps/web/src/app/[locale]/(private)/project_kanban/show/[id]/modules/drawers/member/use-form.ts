"use client";

import { Field, IValidatorRequest, useFormList } from "@repo/form";
import { Shallow } from "@repo/form";
import { profile, project_member } from "@repo/types";

import { IUseHookProps } from "@/templates/card-list/cards/register/types";

import { useKanbanShow } from "../../../context";

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

export const useForm = ({ disabled }: IUseHookProps<Form>) => {
  const defaultValues: Partial<Form> = {};

  const { data, select } = useKanbanShow();

  const fields: Field<Form>[] = [
    {
      field: "select-simple-infinity",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-2",
      required: true,
      disabled,
      index: select.profile,
      search: select.search.profile,
      setSearch: (search) => select.handleSearch("profile", search),
      formatter: (items: profile[]) =>
        items
          ?.map((profile) => ({
            label: profile.user?.name || "",
            value: profile.id,
            item: profile,
          }))
          ?.filter(
            (profile) => !data.members.some((member) => member.profile_id === profile.value)
          ) || [],
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
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
