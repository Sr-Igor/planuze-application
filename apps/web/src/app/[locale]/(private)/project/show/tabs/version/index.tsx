import { useLang } from "@repo/language/hook";

import { useProjectVersion } from "@/api/callers/project_version";
import { project_version } from "@/api/generator/types";
import { useIntlFormat } from "@/hooks/intl-format";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";

import { useForm } from "./use-form";

export const Version = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();
  const { dates } = useIntlFormat();

  return (
    <CardCrud<project_version>
      card={{
        icon: "BookMarked",
        title: (item) => `V${item.version} ${item.name ? `(${item.name})` : ""}`,
        descriptions: (item) => [
          `${t.page.project("show.version.expected")}: ${item?.original_start_date ? dates.format(new Date(item?.original_start_date)) : "-"}`,
          `${t.page.project("show.version.effective")}: ${item?.real_start_date ? dates.format(new Date(item?.real_start_date)) : "-"}`,
          `${t.page.project("show.version.responsible")}: ${item?.owner?.user?.name || item?.owner?.anonymous_name || "-"}`,
        ],
      }}
      hookReq={useProjectVersion}
      page={"project"}
      translate="show.version"
      pathKey="project_version"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_version()}
      trash={trash.project_version()}
    />
  );
};
