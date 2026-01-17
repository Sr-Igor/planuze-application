import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { cost_center, cost_centerCreateInput } from "./cost_center";
import { log__profile_bonus, log__profile_bonusCreateInput } from "./log__profile_bonus";

export interface profile_bonus {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
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
  type: string;
  profile?: profile;
  company?: company;
  cost_center?: cost_center;
  logs?: log__profile_bonus[];
}

export interface profile_bonusCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
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
  type?: string;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  cost_center?: cost_centerCreateInput;
  logs?: log__profile_bonusCreateInput[];
}

export type profile_bonusUpdateInput = Partial<profile_bonusCreateInput>;

