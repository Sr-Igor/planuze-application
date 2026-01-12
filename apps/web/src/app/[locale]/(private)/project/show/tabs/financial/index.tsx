import { useLocale } from "next-intl";

import { project_financial } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { useProjectFinancial } from "@/api/callers/project_financial";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";
import { formatCurrency } from "@repo/utils/currency";

import { useForm } from "./use-form";

export const Financial = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();
  const locale = useLocale();

  return (
    <CardCrud<project_financial>
      card={{
        icon: "RefreshCcwDot",
        title: (item) =>
          `${item?.work_type?.title || "-"} (V${item?.project_version?.version || "-"})`,
        descriptions: (item) => {
          const discountValue =
            (item?.total_value * (item.discount || 0)) / (100 - item.discount || 0);
          const amount = Number(item?.total_value) + Number(discountValue);

          const discountLabel = formatCurrency(discountValue, item?.currency, locale);
          const amountLabel = formatCurrency(amount, item?.currency, locale);
          const totalLabel = formatCurrency(item?.total_value, item?.currency, locale);

          return [
            `${item?.cycles} ${t.property("cycles")}`,
            item?.discount
              ? `${item?.discount}% ${t.helper("of")} ${t.property("discount")}`
              : null,
            item?.discount ? `${amountLabel} - ${discountLabel} = ${totalLabel}` : amountLabel,
          ];
        },
      }}
      hookReq={useProjectFinancial}
      page={"project"}
      translate="show.financial"
      pathKey="project_financial"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_financial()}
      trash={trash.project_financial()}
    />
  );
};
