import { level, levelCreateInput } from "./level";
import { action, actionCreateInput } from "./action";
import { feature, featureCreateInput } from "./feature";

export interface level_action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  level_id: string;
  action_id: string;
  feature_id: string;
  level?: level;
  action?: action;
  feature?: feature;
}

export interface level_actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  level_id?: string;
  action_id?: string;
  feature_id?: string;
  level?: levelCreateInput;
  action?: actionCreateInput;
  feature?: featureCreateInput;
}

export type level_actionUpdateInput = Partial<level_actionCreateInput>;

