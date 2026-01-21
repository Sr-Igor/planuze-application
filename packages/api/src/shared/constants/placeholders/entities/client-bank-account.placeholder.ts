/**
 * Client bank account placeholder data
 * Used for initial data loading and skeleton states
 */
import type { client_bank_account } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createClientBankAccount = (id: string): client_bank_account => ({
  id,
  client_id: id,
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

export const clientBankAccountPlaceholder: Pagination<client_bank_account> = {
  data: [createClientBankAccount("1"), createClientBankAccount("2"), createClientBankAccount("3")],
  page: 1,
  pages: 1,
  count: 0,
};
