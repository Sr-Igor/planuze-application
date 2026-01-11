import { useLang } from "@repo/language/hook";

import { useProjectConfig } from "@/api/callers/project_config";
import { project_config } from "@/api/generator/types";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardCrud } from "@/templates/card-crud";

import { useForm } from "./use-form";

export const Config = () => {
  const logs = useLogs();
  const trash = useTrash();
  const t = useLang();

  return (
    <CardCrud<project_config>
      card={{
        icon: "Cog",
        title: (item) => `${t.helper("config")}: V${item.project_version?.version}`,
        descriptions: (item) => [
          `${t.property("total_hour_day")}: ${item?.total_hour_day}${t.helper("timer.h")}`,
          `${t.property("util_hour_day")}: ${item?.util_hour_day}${t.helper("timer.h")}`,
        ],
      }}
      hookReq={useProjectConfig}
      page={"project"}
      translate="show.config"
      pathKey="project_config"
      getFilters={(data) => ({
        project_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_id: data?.id,
      })}
      useForm={useForm}
      logs={logs.project_config()}
      trash={trash.project_config()}
    />
  );
};
