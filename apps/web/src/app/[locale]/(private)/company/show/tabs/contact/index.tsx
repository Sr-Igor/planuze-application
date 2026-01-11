import { company, company_contact } from "@repo/api/generator/types";

import { useCompanyContact } from "@/api/callers/company_contact";
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
    <CardListTemplate<company, company_contact>
      path="company"
      translate="show.contact"
      dataAccess="company_contacts"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<company_contact>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.company_contact()}
          />
        );
      }}
      getFilters={(data) => ({
        company_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        company_id: data?.id,
      })}
      hookReq={useCompanyContact}
      trash={trash.company_contact()}
    />
  );
};
