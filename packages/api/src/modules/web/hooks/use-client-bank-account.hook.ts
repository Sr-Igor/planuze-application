import type { client_bank_account } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { clientBankAccountPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientBankAccountEndpoint } from "../endpoints/client_bank_account";

/**
 * Hook for Client Bank Account operations
 */
export const useClientBankAccount = (
  props: UseCallerProps<client_bank_account>
): UseInsertReturn<client_bank_account> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<client_bank_account>({
    endpoint: clientBankAccountEndpoint,
    cacheKeys: cacheKeys.client_bank_account,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: clientBankAccountPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
