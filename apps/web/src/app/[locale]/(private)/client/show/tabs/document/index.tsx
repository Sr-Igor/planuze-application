import { useClientDocument } from "@repo/api/web";
import { client, client_document } from "@repo/types";

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
    <CardListTemplate<client, client_document>
      path="client"
      translate="show.document"
      dataAccess="client_documents"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<client_document>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.client_document()}
          />
        );
      }}
      hookReq={useClientDocument}
      getBodyKeys={(data) => ({
        client_id: data?.id,
      })}
      getFilters={(data) => ({
        client_id: data?.id,
      })}
      trash={trash.client_document()}
    />
  );
};
