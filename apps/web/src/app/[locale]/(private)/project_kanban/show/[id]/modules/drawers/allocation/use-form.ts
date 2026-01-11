"use client";

import { IValidatorRequest } from "@deviobr/validator";

import { profile, project_kanban_cycle_allocation } from "@/api/generator/types";
import { useConstants } from "@/hooks/constants";
import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { Shallow } from "@/types/shallowType";

import { useKanbanShow } from "../../../context";

type Form = Shallow<project_kanban_cycle_allocation>;

const schema: IValidatorRequest = {
  body: [
    {
      key: "profile_id",
      method: "string",
      coerse: "string",
      model: "profile",
      column: "id",
    },
    {
      key: "time",
      method: "numeric",
      coerse: "number",
      optional: true,
      nullable: true,
      int: false,
      positive: true,
    },
    {
      key: "unit",
      method: "enumeric",
      coerse: "string",
      values: ["hour", "minute"],
    },
  ],
};

export const useForm = ({ disabled, item }: IUseHookProps<Form>) => {
  const { units } = useConstants();

  const { data, general, select } = useKanbanShow();
  const allocation = general.state.allocation;

  const asMember = !!allocation?.project_member_id;

  const defaultValues: Partial<Form> = {
    unit: "hour",
    time: null,
  };

  const fields: Field<Form>[] = [
    {
      field: "infinity_select",
      name: "profile_id",
      label: "profile_id",
      className: "col-span-2",
      required: true,
      disabled: disabled || asMember || !!item?.id,
      index: select.profile,
      search: select.search.profile,
      fallbackValue: allocation?.profile?.user?.name || allocation?.profile?.anonymous_name,
      setSearch: (search) => select.handleSearch("profile", search),
      formatter: (items: profile[]) => {
        const profiles =
          items?.map((profile) => ({
            label: profile.user?.name || profile.anonymous_name || "-",
            value: profile.id,
            item: profile,
          })) || [];

        if (asMember) return profiles;

        return profiles.filter(
          (profile) =>
            !data.members.some((member) => member.profile_id === profile.value) &&
            !data.allocations.some((allocation) => allocation.profile_id === profile.value)
        );
      },
    },
    {
      field: "numeric",
      name: "time",
      label: "time",
      className: "col-span-1",
    },

    {
      field: "select",
      name: "unit",
      label: "unit",
      type: "select",
      className: "col-span-1",
      required: true,
      disabled,
      options: units,
    },
  ];

  const form = useFormList<Form>({
    fields,
    schema,
    values: allocation,
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
