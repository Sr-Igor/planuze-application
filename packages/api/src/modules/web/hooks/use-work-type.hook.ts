import type { work_type } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { workTypeEndpoint } from "../endpoints/work_type";

/**
 * Hook for Work Type CRUD operations
 */
export const useWorkType = (props: UseCallerProps<work_type>): UseCrudReturn<work_type> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<work_type>({
    endpoint: workTypeEndpoint as any,
    cacheKeys: cacheKeys.work_type,
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
