import { project_allocation } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { useProjectAllocation } from "@repo/api/web/callers/project_allocation";
import { useIntlFormat } from "@/hooks/intl-format";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";

import { useForm } from "./use-form";

export const Allocation = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();
  const { dates } = useIntlFormat();

  return (
    <CardCrud<project_allocation>
      card={{
        icon: "Clock10",
        title: (item) => `${item.profile?.user?.name || item.profile?.anonymous_name || "-"}`,
        descriptions: (item) => [
          `${t.page.project("show.allocation.version")}: V${item.project_version?.version}`,
          `${t.page.project("show.allocation.start_date")}: ${item?.start_date ? dates.formatDate(item?.start_date) : "-"}`,
          `${t.page.project("show.allocation.end_date")}: ${item?.end_date ? dates.formatDate(item?.end_date) : "-"}`,
        ],
      }}
      hookReq={useProjectAllocation}
      page={"project"}
      translate="show.allocation"
      pathKey="project_allocation"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_allocation()}
      trash={trash.project_allocation()}
    />
  );
};
