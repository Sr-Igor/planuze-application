import { client, client_contact } from "@repo/types";

import { useClientContact } from "@repo/api/web/callers/client_contact";
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
    <CardListTemplate<client, client_contact>
      path="client"
      translate="show.contact"
      dataAccess="client_contacts"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<client_contact>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.client_contact()}
          />
        );
      }}
      hookReq={useClientContact}
      getFilters={(data) => ({
        client_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        client_id: data?.id,
      })}
      trash={trash.client_contact()}
    />
  );
};
