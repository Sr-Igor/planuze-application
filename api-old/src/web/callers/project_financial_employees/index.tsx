import * as api from "#/web/req/project_financial_employees";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_financial_employees } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectFinancialEmployees = (
  props: IUseCallerProps<project_financial_employees>
) => {
  return useInsert({
    ...props,
    api,
    cache: "project_financial_employees",
    placeholder,
  });
};
