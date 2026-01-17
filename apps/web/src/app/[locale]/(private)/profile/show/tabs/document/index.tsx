import { profile, profile_document } from "@repo/types";

import { useProfileDocument } from "@repo/api/web/callers/profile_document";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Document = () => {
  const logs = useLogs();
  const trash = useTrash();

  return (
    <CardListTemplate<profile, profile_document>
      path="profile"
      translate="show.document"
      dataAccess="profile_documents"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_document>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.profile_document()}
          />
        );
      }}
      hookReq={useProfileDocument}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        profile_id: data?.id,
      })}
      trash={trash.profile_document()}
    />
  );
};
