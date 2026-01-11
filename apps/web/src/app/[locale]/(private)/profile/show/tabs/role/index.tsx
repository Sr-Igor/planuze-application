import { profile, profile_role } from "@repo/api/generator/types";

import { useProfileRole } from "@/api/callers/profile_role";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Role = () => {
  const trash = useTrash();
  const logs = useLogs();

  return (
    <CardListTemplate<profile, profile_role>
      path="profile"
      translate="show.role"
      dataAccess="profile_roles"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_role>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.profile_role()}
          />
        );
      }}
      hookReq={useProfileRole}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        profile_id: data?.id,
      })}
      trash={trash.profile_role()}
    />
  );
};
