export interface PermissionTableProps {
    groupFeatures: any[];
    allActions: string[];
    isActionSelected: (featurePath: string, actionName: string) => boolean;
    handleActionChange: (featurePath: string, actionName: string) => void;
    handleFeatureSelectAll: (feature: any) => void;
    isFeatureAllSelected: (feature: any) => boolean;
    isFeatureSomeSelected: (feature: any) => boolean;
    isPerDependency: (featureId: string, actionName: string) => { isDep: boolean; listNames: any[] };
    isDisabled: (status: string, allowed: boolean, isAdministrator?: boolean) => boolean;
    loading: boolean;
    status: string;
    allowed: boolean;
    isAdministrator?: boolean;
    t: any;
    isGroupAllSelected: (groupFeatures: any[]) => boolean;
    isGroupSomeSelected: (groupFeatures: any[]) => boolean;
    handleGroupSelectAll: (groupFeatures: any[]) => void;
}

export interface GroupCollapsibleProps {
    groupName: string;
    groupFeatures: any[];
    allActions: string[];
    isGroupAllSelected: (groupFeatures: any[]) => boolean;
    isGroupSomeSelected: (groupFeatures: any[]) => boolean;
    handleGroupSelectAll: (groupFeatures: any[]) => void;
    isActionSelected: (featurePath: string, actionName: string) => boolean;
    handleActionChange: (featurePath: string, actionName: string) => void;
    handleFeatureSelectAll: (feature: any) => void;
    isFeatureAllSelected: (feature: any) => boolean;
    isFeatureSomeSelected: (feature: any) => boolean;
    isPerDependency: (featureId: string, actionName: string) => { isDep: boolean; listNames: any[] };
    isDisabled: (status: string, allowed: boolean, isAdministrator?: boolean) => boolean;
    loading: boolean;
    status: string;
    allowed: boolean;
    isAdministrator?: boolean;
    t: any;
}

export interface SmallScreenViewProps {
    sortedFeatures: any[];
    allActions: string[];
    isAllSelected: boolean;
    isSomeSelected: boolean;
    handleSelectAll: () => void;
    isActionSelected: (featurePath: string, actionName: string) => boolean;
    handleActionChange: (featurePath: string, actionName: string) => void;
    handleFeatureSelectAll: (feature: any) => void;
    isFeatureAllSelected: (feature: any) => boolean;
    isFeatureSomeSelected: (feature: any) => boolean;
    isPerDependency: (featureId: string, actionName: string) => { isDep: boolean; listNames: any[] };
    isDisabled: (status: string, allowed: boolean, isAdministrator?: boolean) => boolean;
    loading: boolean;
    status: string;
    allowed: boolean;
    isAdministrator?: boolean;
    t: any;
}
