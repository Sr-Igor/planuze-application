import { feature, featureCreateInput } from "./feature";
import { subscription_plan, subscription_planCreateInput } from "./subscription_plan";
import { subscription_plan_feature_action, subscription_plan_feature_actionCreateInput } from "./subscription_plan_feature_action";

export interface subscription_plan_feature {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  feature_id: string;
  subscription_plan_id: string;
  feature?: feature;
  subscription_plan?: subscription_plan;
  subscription_plan_feature_actions?: subscription_plan_feature_action[];
}

export interface subscription_plan_featureCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  feature_id?: string;
  subscription_plan_id?: string;
  feature?: featureCreateInput;
  subscription_plan?: subscription_planCreateInput;
  subscription_plan_feature_actions?: subscription_plan_feature_actionCreateInput[];
}

export type subscription_plan_featureUpdateInput = Partial<subscription_plan_featureCreateInput>;

