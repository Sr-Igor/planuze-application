export interface FeatureWithActions {
  id?: string;
  title?: string;
  path?: string;
  sidebar?: boolean;
  icon?: string | null;
  module_id?: string;
  route?: string | null;
  active?: boolean;
  order?: number;
  group?: string | null;
  reference?: string | null;
  actions: string[];
  feature_dependencies?: {
    feature_id: string;
    action_id: string;
    feature_target_id: string;
    action_target_id: string;
  }[];
}

export interface ModuleWithFeatures {
  title: string;
  icon: string | null;
  basic?: boolean;
  features: FeatureWithActions[];
}

export type AccessView = Record<string, ModuleWithFeatures>;

export type Permissions = Record<string, boolean>;
