export interface UsePermissionSelectionProps<T> {
    actions: T[];
    getActionKey: (featurePath: string, actionTitle?: string) => string;
    getFeaturePath: (action: T) => string;
    getActionTitle: (action: T) => string;
    handleDirty: (dirty: boolean) => void;
}

export interface UseFeatureGroupingProps {
    sortedFeatures: any[];
}

export interface UsePermissionStatusProps {
    companyView: any;
    userView: any;
    customDisabledCondition?: (status: string, allowed: boolean, isAdministrator?: boolean) => boolean;
    additionalDisabledCondition?: boolean;
}

export interface UsePermissionCardProps<T> {
    module: any;
    companyView: any;
    userView: any;
    access: any;
    actions: T[];
    getActionKey: (featurePath: string, actionTitle?: string) => string;
    getFeaturePath: (action: T) => string;
    getActionTitle: (action: T) => string;
    handleDirty: (dirty: boolean) => void;
    allowed: boolean;
    isAdministrator?: boolean;
    customDisabledCondition?: (status: string, allowed: boolean, isAdministrator?: boolean) => boolean;
    additionalDisabledCondition?: boolean;
}
