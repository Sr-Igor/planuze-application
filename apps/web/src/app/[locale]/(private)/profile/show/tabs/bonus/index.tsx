import { useProfileBonus } from "@repo/api/web";
import { profile, profile_bonus } from "@repo/types";

import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Bonus = () => {
  const logs = useLogs();
  const trash = useTrash();

  return (
    <CardListTemplate<profile, profile_bonus>
      path="profile"
      translate="show.bonus"
      dataAccess="profile_bonus"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_bonus>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.profile_bonus()}
          />
        );
      }}
      hookReq={useProfileBonus}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        profile_id: data?.id,
      })}
      trash={trash.profile_bonus()}
    />
  );
};
