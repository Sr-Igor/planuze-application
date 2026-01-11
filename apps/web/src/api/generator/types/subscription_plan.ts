import { subscription, subscriptionCreateInput } from "./subscription";
import { company, companyCreateInput } from "./company";
import { subscription_plan_feature, subscription_plan_featureCreateInput } from "./subscription_plan_feature";

export interface subscription_plan {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  subscription_id: string;
  title: string;
  price: number | null;
  billing_model: string;
  free_test: number;
  licenses: number | null;
  gateway: string;
  company_id: string | null;
  icon: string;
  metadata: any | null;
  price_id: string;
  currency: string;
  subscription?: subscription;
  company?: company;
  subscription_plan_features?: subscription_plan_feature[];
}

export interface subscription_planCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  subscription_id?: string;
  title: string;
  price?: number | null;
  billing_model: string;
  free_test?: number;
  licenses?: number | null;
  gateway?: string;
  company_id?: string | null;
  icon: string;
  metadata?: any | null;
  price_id: string;
  currency: string;
  subscription?: subscriptionCreateInput;
  company?: companyCreateInput;
  subscription_plan_features?: subscription_plan_featureCreateInput[];
}

export type subscription_planUpdateInput = Partial<subscription_planCreateInput>;

