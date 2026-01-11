import { useCallback, useMemo } from 'react';

import { useWindowWidth } from "@repo/hooks/width";

import { PermissionStatus, UsePermissionStatusProps } from '../types';

export const usePermissionStatus = ({
    companyView,
    userView,
    customDisabledCondition,
    additionalDisabledCondition = false
}: UsePermissionStatusProps) => {
    const status = useMemo((): PermissionStatus => {
        if (!companyView) return 'upgrade';
        if (!userView || userView.features.length === 0) return 'forbidden';
        return 'active';
    }, [companyView, userView]);

    const windowWidth = useWindowWidth();
    const isSmallScreen = windowWidth < 1450;

    const isDisabled = useCallback(
        (status: string, allowed: boolean, isAdministrator?: boolean) => {
            if (customDisabledCondition) {
                return customDisabledCondition(status, allowed, isAdministrator);
            }
            return status !== 'active' || isAdministrator || !allowed || additionalDisabledCondition;
        },
        [customDisabledCondition, additionalDisabledCondition]
    );

    return {
        status,
        isSmallScreen,
        isDisabled
    };
};
