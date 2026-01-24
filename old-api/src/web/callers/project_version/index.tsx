import * as api from "#/web/req/project_version";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_version } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectVersion = (props: IUseCallerProps<project_version>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_version",
    placeholder,
  });
};
