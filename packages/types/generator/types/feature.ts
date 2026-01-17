import { module, moduleCreateInput } from "./module";
import { feature_dependency, feature_dependencyCreateInput } from "./feature_dependency";
import { integration_action, integration_actionCreateInput } from "./integration_action";
import { level_action, level_actionCreateInput } from "./level_action";
import { plan_feature, plan_featureCreateInput } from "./plan_feature";
import { subscription_plan_feature, subscription_plan_featureCreateInput } from "./subscription_plan_feature";
import { log__feature, log__featureCreateInput } from "./log__feature";

export interface feature {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  path: string;
  sidebar: boolean;
  icon: string | null;
  module_id: string;
  order: number;
  group: string | null;
  reference: string | null;
  route: string | null;
  show_plan: boolean;
  plan_title: string;
  new: boolean;
  actions: string | null;
  module?: module;
  feature_dependencies?: feature_dependency[];
  feature_dependencies_by_feature_target?: feature_dependency[];
  integration_actions?: integration_action[];
  level_actions?: level_action[];
  plan_features?: plan_feature[];
  subscription_plan_features?: subscription_plan_feature[];
  logs?: log__feature[];
}

export interface featureCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  path: string;
  sidebar?: boolean;
  icon?: string | null;
  module_id?: string;
  order?: number;
  group?: string | null;
  reference?: string | null;
  route?: string | null;
  show_plan?: boolean;
  plan_title: string;
  new?: boolean;
  actions?: string | null;
  module?: moduleCreateInput;
  feature_dependencies?: feature_dependencyCreateInput[];
  feature_dependencies_by_feature_target?: feature_dependencyCreateInput[];
  integration_actions?: integration_actionCreateInput[];
  level_actions?: level_actionCreateInput[];
  plan_features?: plan_featureCreateInput[];
  subscription_plan_features?: subscription_plan_featureCreateInput[];
  logs?: log__featureCreateInput[];
}

export type featureUpdateInput = Partial<featureCreateInput>;

