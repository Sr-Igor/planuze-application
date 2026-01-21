import type { project_financial } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { projectFinancialPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { projectFinancialEndpoint } from "../endpoints/project_financial";

/**
 * Hook for Project Financial operations
 */
export const useProjectFinancial = (
  props: UseCallerProps<project_financial>
): UseInsertReturn<project_financial> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<project_financial>({
    endpoint: projectFinancialEndpoint as any,
    cacheKeys: cacheKeys.project_financial,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: projectFinancialPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
