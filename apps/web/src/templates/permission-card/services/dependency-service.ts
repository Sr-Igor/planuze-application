import { DependencyResult, DependencyServiceProps } from '../types';

export class DependencyService {
    private companyView: any;
    private listActions: any[];
    private getActionKey: (featurePath: string, actionTitle?: string) => string;

    constructor({ companyView, listActions, getActionKey }: DependencyServiceProps) {
        this.companyView = companyView;
        this.listActions = listActions;
        this.getActionKey = getActionKey;
    }

    public getCompanyView = () => this.companyView;
    public getListActions = () => this.listActions;
    public getActionKeyPublic = (featurePath: string, actionTitle?: string) =>
        this.getActionKey(featurePath, actionTitle);

    processDependenciesCascade = (actionKeys: Set<string>, operation: 'add' | 'remove'): Set<string> => {
        const newKeys = new Set(actionKeys);
        let changed = true;
        let iterations = 0;
        const maxIterations = 100;

        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;

            if (operation === 'add') {
                const keysToProcess = Array.from(newKeys);

                for (const key of keysToProcess) {
                    const [featurePath, actionName] = key.split(':');
                    const currentFeature = this.companyView.features.find((f: any) => f.path === featurePath);
                    const currentAction = this.listActions.find((a: any) => a.title === actionName);

                    if (currentFeature && currentAction) {
                        const dependencies = (currentFeature as any).feature_dependencies.filter(
                            (dep: any) => dep.action_id === currentAction.id
                        );

                        dependencies.forEach((dependency: any) => {
                            const targetFeature = this.companyView.features.find(
                                (f: any) => f.id === dependency.feature_target_id
                            );
                            const targetAction = this.listActions.find(
                                (a: any) => a.id === dependency.action_target_id
                            );

                            if (targetFeature && targetAction) {
                                const targetKey = this.getActionKey(targetFeature.path!, targetAction.title!);
                                if (!newKeys.has(targetKey)) {
                                    newKeys.add(targetKey);
                                    changed = true;
                                }
                            }
                        });
                    }
                }
            } else {
                const keysToProcess = Array.from(newKeys);

                for (const key of keysToProcess) {
                    const [featurePath, actionName] = key.split(':');
                    const currentFeature = this.companyView.features.find((f: any) => f.path === featurePath);
                    const currentAction = this.listActions.find((a: any) => a.title === actionName);

                    if (currentFeature && currentAction) {
                        this.companyView.features.forEach((feature: any) => {
                            (feature as any).feature_dependencies.forEach((dependency: any) => {
                                if (
                                    dependency.feature_target_id === currentFeature.id &&
                                    dependency.action_target_id === currentAction.id
                                ) {
                                    const dependentFeature = this.companyView.features.find(
                                        (f: any) => f.id === dependency.feature_id
                                    );
                                    const dependentAction = this.listActions.find(
                                        (a: any) => a.id === dependency.action_id
                                    );

                                    if (dependentFeature && dependentAction) {
                                        const dependentKey = this.getActionKey(
                                            dependentFeature.path!,
                                            dependentAction.title!
                                        );
                                        if (newKeys.has(dependentKey)) {
                                            newKeys.delete(dependentKey);
                                            changed = true;
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }
        }

        if (iterations >= maxIterations) {
            console.warn('Dependency cascade reached maximum iterations. There might be circular dependencies.');
        }

        return newKeys;
    };

    isDependentGivenSelection = (
        selection: Set<string>,
        targetFeatureId: string,
        targetActionName: string
    ): boolean => {
        const targetAction = this.listActions.find((a: any) => a.title === targetActionName);
        if (!targetAction) return false;

        let dependent = false;

        this.companyView.features.forEach((feature: any) => {
            (feature as any).feature_dependencies.forEach((dependency: any) => {
                if (
                    dependency.feature_target_id === targetFeatureId &&
                    dependency.action_target_id === targetAction.id
                ) {
                    const originFeature = this.companyView.features.find((f: any) => f.id === dependency.feature_id);
                    const originAction = this.listActions.find((a: any) => a.id === dependency.action_id);
                    if (originFeature && originAction) {
                        const parentKey = this.getActionKey(originFeature.path!, originAction.title!);
                        if (selection.has(parentKey)) {
                            dependent = true;
                        }
                    }
                }
            });
        });

        return dependent;
    };

    isPerDependency = (featureId: string, actionName: string, selectedActionKeys: Set<string>): DependencyResult => {
        const action = this.listActions.find((a: any) => a.title === actionName);

        const listNames: { feature: string; action: string }[] = [];

        let isDep = false;

        this.companyView.features.forEach((feature: any) => {
            let ok = false;
            (feature as any).feature_dependencies.forEach((dependency: any) => {
                const isDep = dependency.feature_target_id === featureId && dependency.action_target_id === action?.id;

                const originalFeature = this.companyView.features.find((f: any) => f.id === dependency.feature_id);
                const originalAction = this.listActions.find((a: any) => a.id === dependency.action_id);

                const isActionSelected = selectedActionKeys.has(
                    this.getActionKey(originalFeature!.path!, originalAction?.title)
                );

                if (isDep && isActionSelected) {
                    listNames.push({
                        feature: originalFeature!.path!,
                        action: originalAction!.title!
                    });
                }

                ok = ok || (isDep && isActionSelected);
            });

            isDep = isDep || ok;
        });

        return {
            isDep,
            listNames
        };
    };
}
