import type { profile_bank_account } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const profileBankAccountEndpoint = createSimpleEndpoint<profile_bank_account>()({
  basePath: "/api/private/profile_bank_account",
  routes: {
    index: "/api/private/profile_bank_account/index",
    store: "/api/private/profile_bank_account/store",
    update: "/api/private/profile_bank_account/update",
    destroy: "/api/private/profile_bank_account/destroy",
    trash: "/api/private/profile_bank_account/trash",
    restore: "/api/private/profile_bank_account/restore",
  },
});

export type ProfileBankAccount = profile_bank_account;

// Direct function exports for backwards compatibility
export const profileBankAccountIndex = profileBankAccountEndpoint.index;
export const profileBankAccountStore = profileBankAccountEndpoint.store;
export const profileBankAccountUpdate = profileBankAccountEndpoint.update;
export const profileBankAccountDestroy = profileBankAccountEndpoint.destroy;
export const profileBankAccountTrash = profileBankAccountEndpoint.trash;
export const profileBankAccountRestore = profileBankAccountEndpoint.restore;
