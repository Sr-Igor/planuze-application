import { subscription, subscriptionCreateInput } from "./subscription";
import { plan, planCreateInput } from "./plan";
import { company, companyCreateInput } from "./company";

export interface subscription_changes {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  subscription_id: string | null;
  from_plan_id: string | null;
  to_plan_id: string | null;
  change_type: string;
  effective_date: string;
  metadata: any | null;
  company_id: string;
  subscription?: subscription;
  from_plan?: plan;
  to_plan?: plan;
  company?: company;
}

export interface subscription_changesCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  subscription_id?: string | null;
  from_plan_id?: string | null;
  to_plan_id?: string | null;
  change_type: string;
  effective_date?: string;
  metadata?: any | null;
  company_id?: string;
  subscription?: subscriptionCreateInput;
  from_plan?: planCreateInput;
  to_plan?: planCreateInput;
  company?: companyCreateInput;
}

export type subscription_changesUpdateInput = Partial<subscription_changesCreateInput>;

