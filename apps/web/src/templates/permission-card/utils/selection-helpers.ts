import { SelectionHelpersProps } from '../types';

export class SelectionHelpers {
    private allActions: string[];
    private getActionKey: (featurePath: string, actionTitle?: string) => string;

    constructor({ allActions, getActionKey }: Pick<SelectionHelpersProps, 'allActions' | 'getActionKey'>) {
        this.allActions = allActions;
        this.getActionKey = getActionKey;
    }

    getAllActionKeys = (sortedFeatures: any[]) => {
        return sortedFeatures.flatMap((feature) =>
            this.allActions
                .filter((action) => feature.actions.includes(action))
                .map((action) => this.getActionKey(feature.path!, action))
        );
    };

    isAllSelected = (allActionKeys: string[], selectedActionKeys: Set<string>) => {
        return allActionKeys.length > 0 && allActionKeys.every((key) => selectedActionKeys.has(key));
    };

    isSomeSelected = (allActionKeys: string[], selectedActionKeys: Set<string>) => {
        return allActionKeys.some((key) => selectedActionKeys.has(key));
    };

    isFeatureAllSelected = (feature: any, selectedActionKeys: Set<string>) => {
        const featureKeys = this.allActions
            .filter((action) => feature.actions.includes(action))
            .map((action) => this.getActionKey(feature.path!, action));
        return featureKeys.length > 0 && featureKeys.every((key) => selectedActionKeys.has(key));
    };

    isFeatureSomeSelected = (feature: any, selectedActionKeys: Set<string>): boolean => {
        const featureKeys = this.allActions
            .filter((action) => feature.actions.includes(action))
            .map((action) => this.getActionKey(feature.path!, action));
        return featureKeys.some((key) => selectedActionKeys.has(key));
    };

    getGroupActionKeys = (groupFeatures: any[]) => {
        return groupFeatures.flatMap((feature) =>
            this.allActions
                .filter((action) => feature.actions.includes(action))
                .map((action) => this.getActionKey(feature.path!, action))
        );
    };

    isGroupAllSelected = (groupFeatures: any[], selectedActionKeys: Set<string>) => {
        const groupKeys = this.getGroupActionKeys(groupFeatures);
        return groupKeys.length > 0 && groupKeys.every((key) => selectedActionKeys.has(key));
    };

    isGroupSomeSelected = (groupFeatures: any[], selectedActionKeys: Set<string>) => {
        const groupKeys = this.getGroupActionKeys(groupFeatures);
        return groupKeys.some((key) => selectedActionKeys.has(key));
    };
}
