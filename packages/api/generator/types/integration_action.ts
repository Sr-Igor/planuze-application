import { integration, integrationCreateInput } from "./integration";
import { action, actionCreateInput } from "./action";
import { feature, featureCreateInput } from "./feature";

export interface integration_action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  integration_id: string;
  action_id: string;
  feature_id: string;
  integration?: integration;
  action?: action;
  feature?: feature;
}

export interface integration_actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  integration_id?: string;
  action_id?: string;
  feature_id?: string;
  integration?: integrationCreateInput;
  action?: actionCreateInput;
  feature?: featureCreateInput;
}

export type integration_actionUpdateInput = Partial<integration_actionCreateInput>;

