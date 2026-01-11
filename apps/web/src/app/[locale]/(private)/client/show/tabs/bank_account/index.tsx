import { client_bank_account } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { useClientBankAccount } from "@/api/callers/client_bank_account";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";

import { useForm } from "./use-form";

export const BankAccount = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();

  return (
    <CardCrud<client_bank_account>
      card={{
        icon: "Landmark",
        title: (item) => `${item.bank_name || "unknown"} - ${item.bank_number || "unknown"}`,
        descriptions: (item) => [
          `${t.page.client("show.bank_account.account")}: ${item.account}${item.digit ? `-${item.digit}` : ""}`,
          `${t.page.client("show.bank_account.agency")}: ${item.agency}`,
          `${t.page.client("show.bank_account.principal")}: ${t.helper(item.principal?.toString())}`,
        ],
      }}
      hookReq={useClientBankAccount}
      page={"client"}
      translate="show.bank_account"
      pathKey="client_bank_account"
      getFilters={(data) => ({
        client_id: data?.id,
        return: "index",
      })}
      getBodyKeys={(data) => ({
        client_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.client_bank_account()}
      trash={trash.client_bank_account()}
    />
  );
};
