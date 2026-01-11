import { project_config } from "@repo/api/generator/types";

import { useInsert } from "@/api/hooks/use-insert";
import * as api from "@/api/req/project_config";
import { IUseCallerProps } from "@/api/types";

import { placeholder } from "./placeholder";

export const useProjectConfig = (props: IUseCallerProps<project_config>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_config",
    placeholder,
  });
};
