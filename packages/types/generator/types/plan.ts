import { company, companyCreateInput } from "./company";
import { plan_feature, plan_featureCreateInput } from "./plan_feature";
import { subscription, subscriptionCreateInput } from "./subscription";
import { subscription_changes, subscription_changesCreateInput } from "./subscription_changes";

export interface plan {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  price: number | null;
  billing_model: string;
  free_test: number | null;
  licenses: number | null;
  gateway: string;
  metadata: any | null;
  price_id: string | null;
  company_id: string | null;
  icon: string | null;
  is_popular: boolean;
  order: number;
  currency: string;
  company?: company;
  plan_features?: plan_feature[];
  subscriptions?: subscription[];
  subscription_changes?: subscription_changes[];
  subscription_changes_by_to_plan?: subscription_changes[];
}

export interface planCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  price?: number | null;
  billing_model?: string;
  free_test?: number | null;
  licenses?: number | null;
  gateway?: string;
  metadata?: any | null;
  price_id?: string | null;
  company_id?: string | null;
  icon?: string | null;
  is_popular?: boolean;
  order?: number;
  currency: string;
  company?: companyCreateInput;
  plan_features?: plan_featureCreateInput[];
  subscriptions?: subscriptionCreateInput[];
  subscription_changes?: subscription_changesCreateInput[];
  subscription_changes_by_to_plan?: subscription_changesCreateInput[];
}

export type planUpdateInput = Partial<planCreateInput>;

