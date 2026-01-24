import * as api from "#/web/req/project_tool";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_tool } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectTool = (props: IUseCallerProps<project_tool>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_tool",
    placeholder,
  });
};
