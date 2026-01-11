'use client';

import { memo, useMemo } from 'react';

import { project_kanban_cycle_card, project_kanban_cycle_column } from '@/api/generator/types';
import { DndContext, closestCenter, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { useKanbanShow } from '../../../context';
import { KanbanColumn } from '../common/components/column';
import { OptimizedDragOverlay } from '../common/components/optimized-drag-overlay';
import { SortableKanbanColumn } from '../common/components/sortable-column';
import { useOptimizedDrag } from '../hooks/use-optimized-drag';

const KanbanBoardComponent = () => {
    const { loadings, updateBoard, data, page, params } = useKanbanShow();

    const { sensors, activeItem, insertPosition, handleDragStart, handleDragOver, handleDragEnd, columns } =
        useOptimizedDrag({
            cycle: page.cycle,
            onBoardUpdate: updateBoard,
            view: params.view
        });

    const customCollisionDetection = useMemo(
        () => (args: any) => {
            const activeData = args.active?.data?.current;

            if (activeData?.type === 'column') {
                return closestCenter(args);
            }

            const pointerCollisions = pointerWithin(args);
            if (pointerCollisions.length > 0) {
                return pointerCollisions;
            }

            return rectIntersection(args);
        },
        []
    );

    return (
        <div className='h-full p-6'>
            <DndContext
                sensors={sensors}
                collisionDetection={customCollisionDetection}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                autoScroll={true}>
                <div className='flex h-full gap-1 overflow-x-auto overflow-y-hidden'>
                    <SortableContext
                        items={columns?.map((col) => col.id) || []}
                        strategy={horizontalListSortingStrategy}>
                        {columns?.map((column) => {
                            return (
                                <SortableKanbanColumn
                                    key={column.id}
                                    column={column}
                                    insertPosition={insertPosition}
                                    isDragActive={!!activeItem}
                                    loading={!!loadings.cycle.index || !!loadings.cardType.index}
                                    visibleCards={data.visibleCards}
                                />
                            );
                        })}
                    </SortableContext>
                </div>

                <OptimizedDragOverlay
                    activeItem={activeItem}
                    columns={columns}
                    visibleCards={data.visibleCards}
                    loading={!!loadings.cycle.index || !!loadings.cardType.index}
                />
            </DndContext>
        </div>
    );
};

export const KanbanBoard = memo(KanbanBoardComponent);
