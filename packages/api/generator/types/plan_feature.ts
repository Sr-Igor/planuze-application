import { feature, featureCreateInput } from "./feature";
import { plan, planCreateInput } from "./plan";
import { plan_feature_action, plan_feature_actionCreateInput } from "./plan_feature_action";

export interface plan_feature {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  feature_id: string;
  plan_id: string;
  feature?: feature;
  plan?: plan;
  plan_feature_actions?: plan_feature_action[];
}

export interface plan_featureCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  feature_id?: string;
  plan_id?: string;
  feature?: featureCreateInput;
  plan?: planCreateInput;
  plan_feature_actions?: plan_feature_actionCreateInput[];
}

export type plan_featureUpdateInput = Partial<plan_featureCreateInput>;

