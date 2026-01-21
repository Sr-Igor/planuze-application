import type { project_financial_employees } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectFinancialEmployeesPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectFinancialEmployeesEndpoint } from "../endpoints/project_financial_employees";

/**
 * Hook for Project Financial Employees operations
 */
export const useProjectFinancialEmployees = (
  props: UseCallerProps<project_financial_employees>
): UseInsertReturn<project_financial_employees> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_financial_employees>({
    endpoint: projectFinancialEmployeesEndpoint as any,
    cacheKeys: cacheKeys.project_financial_employees,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectFinancialEmployeesPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
