import { useCallback, useMemo } from 'react';

import { DependencyService } from '../services/dependency-service';
import { SelectionService } from '../services/selection-service';
import { PermissionPayload, UsePermissionCardProps } from '../types';
import { SelectionHelpers } from '../utils/selection-helpers';
import { useFeatureGrouping } from './use-feature-grouping';
import { usePermissionSelection } from './use-permission-selection';
import { usePermissionStatus } from './use-permission-status';

export const usePermissionCard = <T extends Record<string, any>>({
    module,
    companyView,
    userView,
    access,
    actions,
    getActionKey,
    getFeaturePath,
    getActionTitle,
    handleDirty,
    allowed,
    isAdministrator = false,
    customDisabledCondition,
    additionalDisabledCondition = false
}: UsePermissionCardProps<T>) => {
    const {
        selectedActionKeys,
        setSelectedActionKeys,
        initialActionKeys,
        hasPendingChanges,
        isActionSelected,
        listActions
    } = usePermissionSelection({
        actions,
        getActionKey,
        getFeaturePath,
        getActionTitle,
        handleDirty
    });

    const { status, isSmallScreen, isDisabled } = usePermissionStatus({
        companyView,
        userView,
        customDisabledCondition,
        additionalDisabledCondition
    });

    const sortedFeatures = useMemo(() => {
        return (
            access?.features
                ?.filter((feature: any) => !feature.reference)
                .sort((a: any, b: any) => (a.path || '').localeCompare(b.path || '')) || []
        );
    }, [access?.features]);

    const { groupedFeatures } = useFeatureGrouping({ sortedFeatures });

    const dependencyService = useMemo(() => {
        return new DependencyService({
            companyView,
            listActions,
            getActionKey
        });
    }, [companyView, listActions, getActionKey]);

    const selectionService = useMemo(() => {
        return new SelectionService({
            dependencyService
        });
    }, [dependencyService]);

    const allActions = useMemo(() => listActions.map((a) => a.title), [listActions]);

    const selectionHelpers = useMemo(() => {
        return new SelectionHelpers({
            allActions,
            getActionKey
        });
    }, [allActions, getActionKey]);

    const allActionKeys = useMemo(() => {
        return selectionHelpers.getAllActionKeys(sortedFeatures);
    }, [selectionHelpers, sortedFeatures]);

    const handleSelectAll = useCallback(() => {
        selectionService.handleSelectAll(allActionKeys, selectedActionKeys, setSelectedActionKeys);
    }, [selectionService, allActionKeys, selectedActionKeys, setSelectedActionKeys]);

    const handleFeatureSelectAll = useCallback(
        (feature: any) => {
            const featureKeys = allActions
                .filter((action) => feature.actions.includes(action))
                .map((action) => getActionKey(feature.path!, action));
            selectionService.handleFeatureSelectAll(feature, featureKeys, selectedActionKeys, setSelectedActionKeys);
        },
        [selectionService, allActions, getActionKey, selectedActionKeys, setSelectedActionKeys]
    );

    const handleGroupSelectAll = useCallback(
        (groupFeatures: any[]) => {
            const groupKeys = selectionHelpers.getGroupActionKeys(groupFeatures);
            selectionService.handleGroupSelectAll(groupFeatures, groupKeys, selectedActionKeys, setSelectedActionKeys);
        },
        [selectionService, selectionHelpers, selectedActionKeys, setSelectedActionKeys]
    );

    const handleActionChange = useCallback(
        (featurePath: string, actionName: string) => {
            selectionService.handleActionChange(featurePath, actionName, selectedActionKeys, setSelectedActionKeys);
        },
        [selectionService, selectedActionKeys, setSelectedActionKeys]
    );

    const isPerDependency = useCallback(
        (featureId: string, actionName: string) => {
            return dependencyService.isPerDependency(featureId, actionName, selectedActionKeys);
        },
        [dependencyService, selectedActionKeys]
    );

    const handleSubmit = useCallback(
        async (onUpdate: (payload: PermissionPayload) => void) => {
            const permissionsPayload = Array.from(selectedActionKeys).reduce(
                (acc, key) => {
                    const [path, action] = key.split(':');
                    if (!acc[path]) acc[path] = [];
                    acc[path].push(action);
                    return acc;
                },
                {} as Record<string, string[]>
            );

            onUpdate({
                module_id: module.id,
                actions: permissionsPayload
            });
        },
        [selectedActionKeys, module.id]
    );

    const handleDiscard = useCallback(() => {
        setSelectedActionKeys(initialActionKeys);
    }, [setSelectedActionKeys, initialActionKeys]);

    return {
        // Estado
        selectedActionKeys,
        hasPendingChanges,
        status,
        isSmallScreen,
        sortedFeatures,
        groupedFeatures,
        allActions,
        allActionKeys,

        // Helpers
        isActionSelected,
        isDisabled,
        isPerDependency,

        // Selection helpers
        isAllSelected: selectionHelpers.isAllSelected(allActionKeys, selectedActionKeys),
        isSomeSelected: selectionHelpers.isSomeSelected(allActionKeys, selectedActionKeys),
        isFeatureAllSelected: (feature: any) => selectionHelpers.isFeatureAllSelected(feature, selectedActionKeys),
        isFeatureSomeSelected: (feature: any) => selectionHelpers.isFeatureSomeSelected(feature, selectedActionKeys),
        isGroupAllSelected: (groupFeatures: any[]) =>
            selectionHelpers.isGroupAllSelected(groupFeatures, selectedActionKeys),
        isGroupSomeSelected: (groupFeatures: any[]) =>
            selectionHelpers.isGroupSomeSelected(groupFeatures, selectedActionKeys),

        // Handlers
        handleSelectAll,
        handleFeatureSelectAll,
        handleGroupSelectAll,
        handleActionChange,
        handleSubmit,
        handleDiscard
    };
};
