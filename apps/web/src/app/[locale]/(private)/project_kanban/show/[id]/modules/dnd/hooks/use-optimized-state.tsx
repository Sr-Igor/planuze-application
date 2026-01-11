'use client';

import { useCallback, useMemo, useRef } from 'react';

import { BoardUpdateProps } from '@/app/[locale]/(private)/project_kanban/show/[id]/types';

import { debounce } from 'lodash-es';

interface UseOptimizedStateProps {
    onBoardUpdate?: (props: BoardUpdateProps) => void;
    debounceMs?: number;
}

export const useOptimizedState = ({ onBoardUpdate, debounceMs = 100 }: UseOptimizedStateProps) => {
    const pendingUpdatesRef = useRef<Map<string, BoardUpdateProps>>(new Map());
    const lastUpdateTimeRef = useRef<number>(0);

    const debouncedUpdate = useMemo(
        () =>
            debounce((updates: Map<string, BoardUpdateProps>) => {
                if (updates.size === 0 || !onBoardUpdate) return;

                updates.forEach((update) => {
                    onBoardUpdate(update);
                });

                updates.clear();
                lastUpdateTimeRef.current = Date.now();
            }, debounceMs),
        [onBoardUpdate, debounceMs]
    );

    const optimizedBoardUpdate = useCallback(
        (props: BoardUpdateProps) => {
            if (!onBoardUpdate) return;

            const now = Date.now();
            const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

            if (timeSinceLastUpdate > debounceMs) {
                onBoardUpdate(props);
                lastUpdateTimeRef.current = now;
            } else {
                const updateKey = `${props.type}-${props.item?.id || 'unknown'}`;
                pendingUpdatesRef.current.set(updateKey, props);

                debouncedUpdate(pendingUpdatesRef.current);
            }
        },
        [onBoardUpdate, debounceMs, debouncedUpdate]
    );

    const flushPendingUpdates = useCallback(() => {
        if (pendingUpdatesRef.current.size > 0) {
            debouncedUpdate.flush();
        }
    }, [debouncedUpdate]);

    const clearPendingUpdates = useCallback(() => {
        pendingUpdatesRef.current.clear();
        debouncedUpdate.cancel();
    }, [debouncedUpdate]);

    return {
        optimizedBoardUpdate,
        flushPendingUpdates,
        clearPendingUpdates,
        pendingUpdatesCount: pendingUpdatesRef.current.size
    };
};
