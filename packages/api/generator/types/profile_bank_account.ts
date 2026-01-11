import { company, companyCreateInput } from "./company";
import { profile, profileCreateInput } from "./profile";
import { log__profile_bank_account, log__profile_bank_accountCreateInput } from "./log__profile_bank_account";

export interface profile_bank_account {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  account: string;
  digit: string | null;
  bank_number: string | null;
  type: string;
  principal: boolean;
  comment: string | null;
  profile_id: string;
  bank_name: string | null;
  country: string;
  agency: string;
  company?: company;
  profile?: profile;
  logs?: log__profile_bank_account[];
}

export interface profile_bank_accountCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  account: string;
  digit?: string | null;
  bank_number?: string | null;
  type: string;
  principal?: boolean;
  comment?: string | null;
  profile_id?: string;
  bank_name?: string | null;
  country: string;
  agency: string;
  company?: companyCreateInput;
  profile?: profileCreateInput;
  logs?: log__profile_bank_accountCreateInput[];
}

export type profile_bank_accountUpdateInput = Partial<profile_bank_accountCreateInput>;

