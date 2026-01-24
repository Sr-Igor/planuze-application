import * as api from "#/web/req/project_kanban";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { project_kanban } from "@repo/types";

export const useProjectKanban = (props: IUseCallerProps<project_kanban>) => {
  return useBase({
    ...props,
    api,
    cache: "project_kanban",
  });
};
