import * as api from "#/web/req/project_financial";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_financial } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectFinancial = (props: IUseCallerProps<project_financial>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_financial",
    placeholder,
  });
};
