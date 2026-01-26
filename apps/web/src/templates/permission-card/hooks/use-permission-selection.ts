import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "@repo/redux/hooks";

import { UsePermissionSelectionProps } from "../types";

export const usePermissionSelection = <T extends Record<string, any>>({
  actions,
  getActionKey,
  getFeaturePath,
  getActionTitle,
  handleDirty,
}: UsePermissionSelectionProps<T>) => {
  const { actions: fullActions } = useAppSelector((state) => state.module);

  const listActions = useMemo(() => {
    return fullActions.filter((a) => true);
  }, [fullActions]);

  const [selectedActionKeys, setSelectedActionKeys] = useState<Set<string>>(
    () => new Set(actions.map((a) => getActionKey(getFeaturePath(a), getActionTitle(a))))
  );

  const initialActionKeys = useMemo(
    () => new Set(actions.map((a) => getActionKey(getFeaturePath(a), getActionTitle(a)))),
    [actions, getActionKey, getFeaturePath, getActionTitle]
  );

  const hasPendingChanges = useMemo(() => {
    if (initialActionKeys.size !== selectedActionKeys.size) {
      return true;
    }
    for (const key of selectedActionKeys) {
      if (!initialActionKeys.has(key)) {
        return true;
      }
    }
    return false;
  }, [initialActionKeys, selectedActionKeys]);

  useEffect(() => {
    setSelectedActionKeys(
      new Set(actions.map((a) => getActionKey(getFeaturePath(a), getActionTitle(a))))
    );
  }, [actions]);

  useEffect(() => {
    handleDirty(hasPendingChanges);
  }, [hasPendingChanges, handleDirty]);

  const isActionSelected = useCallback(
    (featurePath: string, actionName: string): boolean => {
      return selectedActionKeys.has(getActionKey(featurePath, actionName));
    },
    [selectedActionKeys, getActionKey]
  );

  return {
    selectedActionKeys,
    setSelectedActionKeys,
    initialActionKeys,
    hasPendingChanges,
    isActionSelected,
    listActions,
  };
};
