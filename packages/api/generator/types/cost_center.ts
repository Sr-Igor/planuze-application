import { company, companyCreateInput } from "./company";
import { profile_bonus, profile_bonusCreateInput } from "./profile_bonus";
import { profile_role, profile_roleCreateInput } from "./profile_role";
import { role, roleCreateInput } from "./role";
import { log__cost_center, log__cost_centerCreateInput } from "./log__cost_center";

export interface cost_center {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  active: boolean;
  company_id: string;
  company?: company;
  profile_bonus?: profile_bonus[];
  profile_roles?: profile_role[];
  roles?: role[];
  logs?: log__cost_center[];
}

export interface cost_centerCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  active?: boolean;
  company_id?: string;
  company?: companyCreateInput;
  profile_bonus?: profile_bonusCreateInput[];
  profile_roles?: profile_roleCreateInput[];
  roles?: roleCreateInput[];
  logs?: log__cost_centerCreateInput[];
}

export type cost_centerUpdateInput = Partial<cost_centerCreateInput>;

