/**
 * Profile bank account placeholder data
 * Used for initial data loading and skeleton states
 */
import type { profile_bank_account } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProfileBankAccount = (id: string): profile_bank_account => ({
  id,
  profile_id: id,
  company_id: id,
  account: id,
  digit: id,
  bank_number: id,
  type: id,
  principal: true,
  comment: id,
  bank_name: id,
  agency: id,
  country: id,
  deleted: false,
  deletedAt: null,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

export const profileBankAccountPlaceholder: Pagination<profile_bank_account> = {
  data: [
    createProfileBankAccount("1"),
    createProfileBankAccount("2"),
    createProfileBankAccount("3"),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
