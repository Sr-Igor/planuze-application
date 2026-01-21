import type { integration } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { integrationEndpoint } from "../endpoints/integration";

/**
 * Hook for Integration CRUD operations
 */
export const useIntegration = (props: UseCallerProps<integration>): UseCrudReturn<integration> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<integration>({
    endpoint: integrationEndpoint as any,
    cacheKeys: cacheKeys.integration,
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
