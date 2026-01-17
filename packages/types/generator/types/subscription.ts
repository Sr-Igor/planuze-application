import { company, companyCreateInput } from "./company";
import { plan, planCreateInput } from "./plan";
import { subscription_changes, subscription_changesCreateInput } from "./subscription_changes";
import { subscription_plan, subscription_planCreateInput } from "./subscription_plan";

export interface subscription {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  plan_id: string;
  model: string;
  gateway_subscription_id: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  days_off: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  gateway: string;
  is_test: boolean;
  cancel_in: string | null;
  cancel_effective_at: string | null;
  company?: company;
  plan?: plan;
  subscription_changes?: subscription_changes[];
  subscription_plan?: subscription_plan;
}

export interface subscriptionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  plan_id?: string;
  model?: string;
  gateway_subscription_id?: string | null;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  days_off?: number;
  start_date?: string | null;
  end_date?: string | null;
  status?: string;
  gateway?: string;
  is_test?: boolean;
  cancel_in?: string | null;
  cancel_effective_at?: string | null;
  company?: companyCreateInput;
  plan?: planCreateInput;
  subscription_changes?: subscription_changesCreateInput[];
  subscription_plan?: subscription_planCreateInput;
}

export type subscriptionUpdateInput = Partial<subscriptionCreateInput>;

