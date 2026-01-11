import { useCallback, useEffect, useRef, useState } from 'react';

import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { useOptimizedState } from '../use-optimized-state';
import { services } from './services';
import { ActiveItem, IUseDndProps, Position } from './types';
import * as utils from './utils';

export const useDnd = ({ cycle, onBoardUpdate }: IUseDndProps) => {
    const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

    // Usar estado otimizado para atualizações de board
    const { optimizedBoardUpdate } = useOptimizedState({
        onBoardUpdate,
        debounceMs: 50
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    );

    const columns = cycle?.project_kanban_cycle_columns?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

    //---------------------------------- UPDATE INSERT POSITION ----------------------------------//
    const [insertPosition, setInsertPosition] = useState<Position | null>(null);

    const insertPositionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateInsertPosition = useCallback((newPosition: Position | null) => {
        return utils.updateInsertPosition({ insertPositionTimeoutRef, setInsertPosition, newPosition });
    }, []);

    useEffect(() => {
        return () => {
            if (insertPositionTimeoutRef.current) {
                clearTimeout(insertPositionTimeoutRef.current);
            }
        };
    }, []);

    //---------------------------------- HANDLE TASKS DRAG OVER ----------------------------------//
    const handleTasksDragOver = useCallback(
        (event: DragOverEvent) => {
            return services.handleTasksDragOver({ event, cycle, updateInsertPosition });
        },
        [cycle, updateInsertPosition]
    );

    //---------------------------------- HANDLE TASKS DRAG END ----------------------------------//
    const handleTasksDragEnd = useCallback(
        (event: DragEndEvent) => {
            return services.handleTasksDragEnd({
                event,
                cycle,
                onBoardUpdate: optimizedBoardUpdate,
                insertPosition,
                updateInsertPosition
            });
        },
        [cycle, optimizedBoardUpdate, insertPosition, updateInsertPosition]
    );

    //---------------------------------- HANDLE DRAG START ----------------------------------//

    const handleDragStart = useCallback((event: DragStartEvent) => {
        services.handleDragStart({ event, setActiveItem });
    }, []);

    //---------------------------------- HANDLE DRAG OVER ----------------------------------//

    const handleDragOver = useCallback(
        (event: DragOverEvent) => {
            services.handleDragOver({
                event,
                updateInsertPosition,
                cycle
            });
        },
        [cycle, updateInsertPosition]
    );

    //---------------------------------- HANDLE DRAG END ----------------------------------//

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            services.handleDragEnd({
                event,
                setActiveItem,
                updateInsertPosition,
                cycle,
                onBoardUpdate: optimizedBoardUpdate,
                insertPosition
            });
        },
        [cycle, optimizedBoardUpdate, insertPosition]
    );

    //---------------------------------- RETURN ----------------------------------//
    return {
        sensors,
        activeItem,
        insertPosition,
        columns,
        handleTasksDragEnd,
        handleTasksDragOver,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    };
};
