import { SelectionServiceProps } from '../types';
import { DependencyService } from './dependency-service';

export class SelectionService {
    private dependencyService: DependencyService;

    constructor({ dependencyService }: Pick<SelectionServiceProps, 'dependencyService'>) {
        this.dependencyService = dependencyService;
    }

    handleSelectAll = (
        allActionKeys: string[],
        selectedActionKeys: Set<string>,
        setSelectedActionKeys: (keys: Set<string> | ((prev: Set<string>) => Set<string>)) => void
    ) => {
        const isAllSelected = allActionKeys.length > 0 && allActionKeys.every((key) => selectedActionKeys.has(key));

        if (isAllSelected) {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);
                allActionKeys.forEach((key) => newSet.delete(key));
                return newSet;
            });
        } else {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);
                allActionKeys.forEach((key) => newSet.add(key));
                return newSet;
            });
        }
    };

    handleFeatureSelectAll = (
        feature: any,
        featureKeys: string[],
        selectedActionKeys: Set<string>,
        setSelectedActionKeys: (keys: Set<string> | ((prev: Set<string>) => Set<string>)) => void
    ) => {
        const isFeatureAllSelected = featureKeys.length > 0 && featureKeys.every((key) => selectedActionKeys.has(key));

        if (isFeatureAllSelected) {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);

                const isDependentFromOtherFeatures = (key: string) => {
                    const [featurePath, actionTitle] = key.split(':');
                    const companyView = this.dependencyService.getCompanyView();
                    const listActions = this.dependencyService.getListActions();

                    const targetFeature = companyView.features.find((f: any) => f.path === featurePath);
                    if (!targetFeature) return false;

                    const simulated = new Set(newSet);
                    simulated.delete(key);

                    let dependent = false;
                    const action = listActions.find((a: any) => a.title === actionTitle);
                    if (!action) return false;

                    companyView.features.forEach((feat: any) => {
                        if (feat.id === feature.id) return;

                        (feat as any).feature_dependencies.forEach((dependency: any) => {
                            if (
                                dependency.feature_target_id === targetFeature.id &&
                                dependency.action_target_id === action.id
                            ) {
                                const originFeature = companyView.features.find(
                                    (of: any) => of.id === dependency.feature_id
                                );
                                const originAction = listActions.find((oa: any) => oa.id === dependency.action_id);
                                if (originFeature && originAction) {
                                    const parentKey = this.dependencyService.getActionKeyPublic(
                                        originFeature.path!,
                                        originAction.title!
                                    );
                                    if (simulated.has(parentKey)) {
                                        dependent = true;
                                    }
                                }
                            }
                        });
                    });
                    return dependent;
                };

                featureKeys.forEach((key) => {
                    if (!isDependentFromOtherFeatures(key)) {
                        newSet.delete(key);
                    }
                });
                return newSet;
            });
        } else {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);
                featureKeys.forEach((key) => newSet.add(key));
                return this.dependencyService.processDependenciesCascade(newSet, 'add');
            });
        }
    };

    handleGroupSelectAll = (
        groupFeatures: any[],
        groupKeys: string[],
        selectedActionKeys: Set<string>,
        setSelectedActionKeys: (keys: Set<string> | ((prev: Set<string>) => Set<string>)) => void
    ) => {
        const isGroupAllSelected = groupKeys.length > 0 && groupKeys.every((key) => selectedActionKeys.has(key));

        if (isGroupAllSelected) {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);

                const groupFeatureIds = new Set(groupFeatures.map((f) => f.id));

                const isDependentFromOtherGroups = (key: string) => {
                    const [featurePath, actionTitle] = key.split(':');
                    const companyView = this.dependencyService.getCompanyView();
                    const listActions = this.dependencyService.getListActions();

                    const targetFeature = companyView.features.find((f: any) => f.path === featurePath);
                    if (!targetFeature) return false;

                    const simulated = new Set(newSet);
                    simulated.delete(key);

                    let dependent = false;
                    const action = listActions.find((a: any) => a.title === actionTitle);
                    if (!action) return false;

                    companyView.features.forEach((feat: any) => {
                        if (groupFeatureIds.has(feat.id)) return;

                        (feat as any).feature_dependencies.forEach((dependency: any) => {
                            if (
                                dependency.feature_target_id === targetFeature.id &&
                                dependency.action_target_id === action.id
                            ) {
                                const originFeature = companyView.features.find(
                                    (of: any) => of.id === dependency.feature_id
                                );
                                const originAction = listActions.find((oa: any) => oa.id === dependency.action_id);
                                if (originFeature && originAction) {
                                    const parentKey = this.dependencyService.getActionKeyPublic(
                                        originFeature.path!,
                                        originAction.title!
                                    );
                                    if (simulated.has(parentKey)) {
                                        dependent = true;
                                    }
                                }
                            }
                        });
                    });
                    return dependent;
                };

                groupKeys.forEach((key) => {
                    if (!isDependentFromOtherGroups(key)) {
                        newSet.delete(key);
                    }
                });
                return newSet;
            });
        } else {
            setSelectedActionKeys((prev) => {
                const newSet = new Set(prev);
                groupKeys.forEach((key) => newSet.add(key));
                return this.dependencyService.processDependenciesCascade(newSet, 'add');
            });
        }
    };

    handleActionChange = (
        featurePath: string,
        actionName: string,
        selectedActionKeys: Set<string>,
        setSelectedActionKeys: (keys: Set<string> | ((prev: Set<string>) => Set<string>)) => void
    ) => {
        const companyView = this.dependencyService.getCompanyView();
        const listActions = this.dependencyService.getListActions();

        const currentFeature = companyView.features.find((f: any) => f.path === featurePath);
        const currentAction = listActions.find((a: any) => a.title === actionName);

        if (!currentFeature || !currentAction) {
            return;
        }

        setSelectedActionKeys((prev) => {
            const newKeys = new Set(prev);
            const actionKey = this.dependencyService.getActionKeyPublic(featurePath, actionName);
            const isAdding = !newKeys.has(actionKey);

            if (isAdding) {
                newKeys.add(actionKey);
                return this.dependencyService.processDependenciesCascade(newKeys, 'add');
            } else {
                newKeys.delete(actionKey);

                companyView.features.forEach((feature: any) => {
                    (feature as any).feature_dependencies.forEach((dependency: any) => {
                        if (
                            dependency.feature_target_id === currentFeature.id &&
                            dependency.action_target_id === currentAction.id
                        ) {
                            const dependentFeature = companyView.features.find(
                                (f: any) => f.id === dependency.feature_id
                            );
                            const dependentAction = listActions.find((a: any) => a.id === dependency.action_id);

                            if (dependentFeature && dependentAction) {
                                const dependentKey = this.dependencyService.getActionKeyPublic(
                                    dependentFeature.path!,
                                    dependentAction.title!
                                );
                                if (
                                    !this.dependencyService.isDependentGivenSelection(
                                        newKeys,
                                        dependentFeature.id!,
                                        dependentAction.title!
                                    )
                                ) {
                                    newKeys.delete(dependentKey);
                                }
                            }
                        }
                    });
                });

                return newKeys;
            }
        });
    };
}
