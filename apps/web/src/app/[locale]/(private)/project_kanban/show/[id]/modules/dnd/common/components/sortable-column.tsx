'use client';

import { memo } from 'react';

import { useAccess } from '@/hooks/access';
import { cn } from '@repo/ui-new';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useKanbanShow } from '../../../../context';
import { SortableKanbanColumnProps } from '../../types';
import { KanbanColumn } from './column';

const SortableKanbanColumnComponent = ({
    column,
    insertPosition,
    isDragActive,
    loading,
    visibleCards
}: SortableKanbanColumnProps) => {
    const { permissions } = useAccess();
    const perm = permissions('project_kanban_cycle');

    const { general } = useKanbanShow();

    const disabled = general.state.inLoading?.includes(column.id);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: 'column',
            column
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...(perm.many ? attributes : {})}
            className={cn(
                isDragging ? 'opacity-50' : '',
                disabled && 'pointer-events-none cursor-progress opacity-50'
            )}>
            <KanbanColumn
                column={column}
                className={isDragging ? 'opacity-50' : ''}
                insertPosition={insertPosition}
                isDragActive={isDragActive}
                dragListeners={listeners}
                loading={loading}
                visibleCards={visibleCards}
            />
        </div>
    );
};

export const SortableKanbanColumn = memo(SortableKanbanColumnComponent, (prevProps, nextProps) => {
    const jsonOldCards = JSON.stringify(prevProps.column.project_kanban_cycle_cards);
    const jsonNewCards = JSON.stringify(nextProps.column.project_kanban_cycle_cards);

    return (
        prevProps.column.id === nextProps.column.id &&
        prevProps.loading === nextProps.loading &&
        prevProps.isDragActive === nextProps.isDragActive &&
        prevProps.column.updatedAt === nextProps.column.updatedAt &&
        prevProps.column.title === nextProps.column.title &&
        prevProps.column.limit === nextProps.column.limit &&
        jsonOldCards === jsonNewCards &&
        JSON.stringify(prevProps.visibleCards) === JSON.stringify(nextProps.visibleCards) &&
        JSON.stringify(prevProps.insertPosition) === JSON.stringify(nextProps.insertPosition)
    );
});
