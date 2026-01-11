import { project_kanban } from "@repo/api/generator/types";

import { useBase } from "@/api/hooks/use-base";
import * as api from "@/api/req/project_kanban";
import { IUseCallerProps } from "@/api/types";

export const useProjectKanban = (props: IUseCallerProps<project_kanban>) => {
  return useBase({
    ...props,
    api,
    cache: "project_kanban",
  });
};
