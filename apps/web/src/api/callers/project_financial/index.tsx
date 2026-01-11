import { project_financial } from "@repo/api/generator/types";

import { useInsert } from "@/api/hooks/use-insert";
import * as api from "@/api/req/project_financial";
import { IUseCallerProps } from "@/api/types";

import { placeholder } from "./placeholder";

export const useProjectFinancial = (props: IUseCallerProps<project_financial>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_financial",
    placeholder,
  });
};
