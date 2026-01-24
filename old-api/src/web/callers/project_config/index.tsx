import * as api from "#/web/req/project_config";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_config } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectConfig = (props: IUseCallerProps<project_config>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_config",
    placeholder,
  });
};
