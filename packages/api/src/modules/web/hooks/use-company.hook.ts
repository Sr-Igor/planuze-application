import type { company } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { companyEndpoint } from "../endpoints/company/company.endpoint";

/**
 * Hook for Company CRUD operations
 *
 * @example
 * ```tsx
 * const { show, update } = useCompany({
 *   id: companyId,
 *   enabledShow: !!companyId,
 * });
 * ```
 */
export const useCompany = (props: UseCallerProps<company>): UseCrudReturn<company> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<company>({
    endpoint: companyEndpoint,
    cacheKeys: cacheKeys.company,
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
