import type { client_bank_account } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

/**
 * Client Bank Account endpoint
 */
export const clientBankAccountEndpoint = createSimpleEndpoint<client_bank_account>()({
  basePath: "/api/private/client_bank_account",
  routes: {
    index: "/api/private/client_bank_account/index",
    store: "/api/private/client_bank_account/store",
    update: "/api/private/client_bank_account/update",
    destroy: "/api/private/client_bank_account/destroy",
    trash: "/api/private/client_bank_account/trash",
    restore: "/api/private/client_bank_account/restore",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type ClientBankAccount = client_bank_account;

// Direct function exports for backwards compatibility
export const clientBankAccountIndex = clientBankAccountEndpoint.index;
export const clientBankAccountStore = clientBankAccountEndpoint.store;
export const clientBankAccountUpdate = clientBankAccountEndpoint.update;
export const clientBankAccountDestroy = clientBankAccountEndpoint.destroy;
export const clientBankAccountTrash = clientBankAccountEndpoint.trash;
export const clientBankAccountRestore = clientBankAccountEndpoint.restore;
