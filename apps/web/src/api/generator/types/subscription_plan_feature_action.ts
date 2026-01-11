import { subscription_plan_feature, subscription_plan_featureCreateInput } from "./subscription_plan_feature";
import { action, actionCreateInput } from "./action";

export interface subscription_plan_feature_action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  subscription_plan_feature_id: string;
  action_id: string;
  subscription_plan_feature?: subscription_plan_feature;
  action?: action;
}

export interface subscription_plan_feature_actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  subscription_plan_feature_id?: string;
  action_id?: string;
  subscription_plan_feature?: subscription_plan_featureCreateInput;
  action?: actionCreateInput;
}

export type subscription_plan_feature_actionUpdateInput = Partial<subscription_plan_feature_actionCreateInput>;

