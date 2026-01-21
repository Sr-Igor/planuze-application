import type { profile_bank_account } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { profileBankAccountPlaceholder } from "../../../shared/constants/placeholders";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileBankAccountEndpoint } from "../endpoints/profile_bank_account";

/**
 * Hook for Profile Bank Account operations
 */
export const useProfileBankAccount = (
  props: UseCallerProps<profile_bank_account>
): UseInsertReturn<profile_bank_account> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<profile_bank_account>({
    endpoint: profileBankAccountEndpoint,
    cacheKeys: cacheKeys.profile_bank_account,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    placeholder: profileBankAccountPlaceholder,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
