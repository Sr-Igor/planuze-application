import { project_allocation } from "@repo/api/generator/types";

import { useInsert } from "@/api/hooks/use-insert";
import * as api from "@/api/req/project_allocation";
import { IUseCallerProps } from "@/api/types";

import { placeholder } from "./placeholder";

export const useProjectAllocation = (props: IUseCallerProps<project_allocation>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_allocation",
    placeholder,
  });
};
