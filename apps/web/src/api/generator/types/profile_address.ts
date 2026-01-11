import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { log__profile_address, log__profile_addressCreateInput } from "./log__profile_address";

export interface profile_address {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  street: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  profile_id: string;
  number: string | null;
  neighborhood: string | null;
  company_id: string;
  profile?: profile;
  company?: company;
  logs?: log__profile_address[];
}

export interface profile_addressCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  street?: string | null;
  complement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | null;
  profile_id?: string;
  number?: string | null;
  neighborhood?: string | null;
  company_id?: string;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  logs?: log__profile_addressCreateInput[];
}

export type profile_addressUpdateInput = Partial<profile_addressCreateInput>;

