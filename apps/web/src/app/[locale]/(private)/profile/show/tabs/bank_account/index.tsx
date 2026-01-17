import { profile_bank_account } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { useProfileBankAccount } from "@repo/api/web/callers/profile_bank_account";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";

import { useForm } from "./use-form";

export const BankAccount = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();

  return (
    <CardCrud<profile_bank_account>
      card={{
        icon: "Landmark",
        title: (item) => `${item.bank_name || "unknown"} - ${item.bank_number || "unknown"}`,
        descriptions: (item) => [
          `${t.page.profile("show.bank_account.account")}: ${item.account}${item.digit ? `-${item.digit}` : ""}`,
          `${t.page.profile("show.bank_account.agency")}: ${item.agency}`,
          `${t.page.profile("show.bank_account.principal")}: ${t.helper(item.principal?.toString())}`,
        ],
      }}
      hookReq={useProfileBankAccount}
      page={"profile"}
      translate="show.bank_account"
      pathKey="profile_bank_account"
      getFilters={(data) => ({
        profile_id: data?.id,
        return: "index",
      })}
      getBodyKeys={(data) => ({
        profile_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.profile_bank_account()}
      trash={trash.profile_bank_account()}
    />
  );
};
