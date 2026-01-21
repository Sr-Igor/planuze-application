import type { cost_center } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { costCenterEndpoint } from "../endpoints/cost_center";

/**
 * Hook for Cost Center CRUD operations
 */
export const useCostCenter = (props: UseCallerProps<cost_center>): UseCrudReturn<cost_center> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<cost_center>({
    endpoint: costCenterEndpoint as any,
    cacheKeys: cacheKeys.cost_center,
    id,
    filters,
    enabled: {
      index: enabledIndex,
      show: enabledShow,
      trash: enableTrash,
    },
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      many: callbacks?.many,
      restore: callbacks?.restore,
    },
  });
};
