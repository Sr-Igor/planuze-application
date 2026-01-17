import * as api from "#/web/req/project_allocation";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_allocation } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectAllocation = (props: IUseCallerProps<project_allocation>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_allocation",
    placeholder,
  });
};
