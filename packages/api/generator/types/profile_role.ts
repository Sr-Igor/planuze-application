import { role, roleCreateInput } from "./role";
import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { cost_center, cost_centerCreateInput } from "./cost_center";
import { log__profile_role, log__profile_roleCreateInput } from "./log__profile_role";

export interface profile_role {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  role_id: string;
  profile_id: string;
  company_id: string;
  currency: string;
  pay: number;
  start_date: string;
  end_date: string | null;
  recurrence: string;
  active: boolean;
  cost_center_id: string | null;
  payment_routine: string;
  pro_rata: boolean;
  role?: role;
  profile?: profile;
  company?: company;
  cost_center?: cost_center;
  logs?: log__profile_role[];
}

export interface profile_roleCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  role_id?: string;
  profile_id?: string;
  company_id?: string;
  currency: string;
  pay: number;
  start_date: string;
  end_date?: string | null;
  recurrence: string;
  active?: boolean;
  cost_center_id?: string | null;
  payment_routine: string;
  pro_rata?: boolean;
  role?: roleCreateInput;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  cost_center?: cost_centerCreateInput;
  logs?: log__profile_roleCreateInput[];
}

export type profile_roleUpdateInput = Partial<profile_roleCreateInput>;

