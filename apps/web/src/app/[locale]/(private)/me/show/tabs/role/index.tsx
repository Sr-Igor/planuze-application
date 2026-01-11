import { profile, profile_role } from "@repo/api/generator/types";

import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Role = () => {
  return (
    <CardListTemplate<profile, profile_role>
      path="me"
      translate="show.role"
      dataAccess="profile_roles"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_role>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={{ hidden: true }}
          />
        );
      }}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
    />
  );
};
