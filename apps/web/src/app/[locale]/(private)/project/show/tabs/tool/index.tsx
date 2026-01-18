import { useLocale } from "next-intl";

import { project_tool } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { useProjectTool } from "@repo/api/web/callers/project_tool";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";
import { formatCurrency } from "@repo/utils/currency";

import { useForm } from "./use-form";

export const Tool = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();
  const locale = useLocale();

  return (
    <CardCrud<project_tool>
      card={{
        icon: "Ruler",
        title: (item) => `${item?.title || "-"} (V${item?.project_version?.version || "-"})`,
        descriptions: (item) => {
          const totalLabel = formatCurrency(item?.value || 0, item?.currency, locale);

          return [`${totalLabel}`, `${t.helper(item?.type)}`];
        },
      }}
      hookReq={useProjectTool}
      page={"project"}
      translate="show.tool"
      pathKey="project_tool"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_tool()}
      trash={trash.project_tool()}
    />
  );
};
