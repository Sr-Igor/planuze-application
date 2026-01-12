import { useLocale } from "next-intl";

import { project_financial_employees } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { useProjectFinancialEmployees } from "@/api/callers/project_financial_employees";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";
import { formatCurrency } from "@repo/utils/currency";

import { useForm } from "./use-form";

export const FinancialEmployees = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();
  const locale = useLocale();

  return (
    <CardCrud<project_financial_employees>
      card={{
        icon: "UsersRound",
        title: (item) => `${item?.role?.title || "-"}`,
        descriptions: (item) => [
          `${t.property("quantity")}: ${item?.quantity}`,
          `${formatCurrency(item?.unit_value, item?.currency, locale)} x ${item?.quantity} = ${formatCurrency(item?.unit_value * item?.quantity, item?.currency, locale)}`,
        ],
      }}
      hookReq={useProjectFinancialEmployees}
      page={"project"}
      translate="show.financial_employees"
      pathKey="project_financial_employees"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_financial_employees()}
      trash={trash.project_financial_employees()}
    />
  );
};
