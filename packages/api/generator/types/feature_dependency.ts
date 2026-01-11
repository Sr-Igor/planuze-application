import { feature, featureCreateInput } from "./feature";
import { action, actionCreateInput } from "./action";

export interface feature_dependency {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  feature_id: string;
  action_id: string;
  feature_target_id: string;
  action_target_id: string;
  feature?: feature;
  action?: action;
  feature_target?: feature;
  action_target?: action;
}

export interface feature_dependencyCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  feature_id?: string;
  action_id?: string;
  feature_target_id?: string;
  action_target_id?: string;
  feature?: featureCreateInput;
  action?: actionCreateInput;
  feature_target?: featureCreateInput;
  action_target?: actionCreateInput;
}

export type feature_dependencyUpdateInput = Partial<feature_dependencyCreateInput>;

