export type CheckboxState = boolean | 'indeterminate';

export type PermissionStatus = 'active' | 'upgrade' | 'forbidden';

export interface Feature {
    id: string;
    path: string;
    actions: string[];
    group?: string;
    reference?: boolean;
    feature_dependencies?: FeatureDependency[];
}

export interface FeatureDependency {
    feature_id: string;
    action_id: string;
    feature_target_id: string;
    action_target_id: string;
}

export interface Action {
    id: string;
    title: string;
    integration?: boolean;
}

export interface Module {
    id: string;
    title: string;
    icon: string;
    basic?: boolean;
    integration?: boolean;
}

export interface PermissionPayload {
    module_id: string;
    actions: Record<string, string[]>;
}

export interface TranslationFunction {
    (key: string, params?: Record<string, any>): string;
    module: (key: string) => string;
    permission: (key: string, params?: Record<string, any>) => string;
    model: (key: string) => string;
    helper: (key: string) => string;
    page: {
        level: (key: string) => string;
    };
}
