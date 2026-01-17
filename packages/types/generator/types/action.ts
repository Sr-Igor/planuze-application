import { feature_dependency, feature_dependencyCreateInput } from "./feature_dependency";
import { integration_action, integration_actionCreateInput } from "./integration_action";
import { level_action, level_actionCreateInput } from "./level_action";
import { plan_feature_action, plan_feature_actionCreateInput } from "./plan_feature_action";
import { subscription_plan_feature_action, subscription_plan_feature_actionCreateInput } from "./subscription_plan_feature_action";

export interface action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  integration: boolean;
  feature_dependencies?: feature_dependency[];
  feature_dependencies_by_action_target?: feature_dependency[];
  integration_actions?: integration_action[];
  level_actions?: level_action[];
  plan_feature_actions?: plan_feature_action[];
  subscription_plan_feature_actions?: subscription_plan_feature_action[];
}

export interface actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  integration?: boolean;
  feature_dependencies?: feature_dependencyCreateInput[];
  feature_dependencies_by_action_target?: feature_dependencyCreateInput[];
  integration_actions?: integration_actionCreateInput[];
  level_actions?: level_actionCreateInput[];
  plan_feature_actions?: plan_feature_actionCreateInput[];
  subscription_plan_feature_actions?: subscription_plan_feature_actionCreateInput[];
}

export type actionUpdateInput = Partial<actionCreateInput>;

