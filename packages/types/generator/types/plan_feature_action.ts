import { plan_feature, plan_featureCreateInput } from "./plan_feature";
import { action, actionCreateInput } from "./action";

export interface plan_feature_action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  plan_feature_id: string;
  action_id: string;
  plan_feature?: plan_feature;
  action?: action;
}

export interface plan_feature_actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  plan_feature_id?: string;
  action_id?: string;
  plan_feature?: plan_featureCreateInput;
  action?: actionCreateInput;
}

export type plan_feature_actionUpdateInput = Partial<plan_feature_actionCreateInput>;

