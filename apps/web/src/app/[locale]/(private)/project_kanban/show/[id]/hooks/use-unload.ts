import { useCallback, useMemo, useState } from 'react';

import { useUnload as useExternal } from "@repo/hooks/unload";

import { Feature, IHandleCancelStateProps, IHandleDirtyStateProps, IUseUnloadReturnProps, Mode } from '../types';

export const useUnload = (): IUseUnloadReturnProps => {
    const [dirty, setDirty] = useState<Partial<Record<Feature, Partial<Record<Mode, boolean>>>>>({});
    const [cancel, setCancel] = useState<IHandleCancelStateProps | null>(null);

    const isDirty = useMemo(() => {
        return Object.values(dirty || {}).some((mode) => Object.values(mode || {}).some((feature) => feature));
    }, [dirty]);

    const handleState = useCallback((obj: IHandleDirtyStateProps) => {
        setDirty((prev) => {
            const featureItem = prev?.[obj.feature];
            return {
                ...prev,
                [obj.feature]: {
                    ...featureItem,
                    ...obj.modes.reduce((acc, mode) => {
                        acc[mode] = obj.dirty;
                        return acc;
                    }, featureItem || {})
                }
            };
        });
    }, []);

    const isInDirty = useCallback(
        (feature: Feature, modes: Mode[]) => {
            const featureItem = dirty?.[feature];
            return modes.some((mode) => featureItem?.[mode]);
        },
        [dirty]
    );

    useExternal(isDirty);

    return {
        handleState,
        isDirty,
        cancel,
        setCancel,
        isInDirty
    };
};
