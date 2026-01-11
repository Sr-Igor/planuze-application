import { profile, profile_contact } from "@repo/api/generator/types";

import { useProfileContact } from "@/api/callers/profile_contact";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Contact = () => {
  const logs = useLogs();
  const trash = useTrash();
  return (
    <CardListTemplate<profile, profile_contact>
      path="profile"
      translate="show.contact"
      dataAccess="profile_contacts"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_contact>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.profile_contact()}
          />
        );
      }}
      hookReq={useProfileContact}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        profile_id: data?.id,
      })}
      trash={trash.profile_contact()}
    />
  );
};
