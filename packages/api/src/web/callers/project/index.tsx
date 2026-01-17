import * as api from "#/web/req/project";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { project } from "@repo/types";

export const useProject = (props: IUseCallerProps<project>) => {
  return useBase({
    ...props,
    api,
    cache: "project",
  });
};
