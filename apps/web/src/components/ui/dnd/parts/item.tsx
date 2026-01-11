import { memo } from 'react';

import { useDND } from '../hooks';
import { Draggable } from '../lib';
import { DraggableItemProps } from '../types';

export const DraggableItem: React.FC<DraggableItemProps> = memo(
    ({ item, index, children, disabled }) => {
        const { getItemStyle } = useDND();

        const draggableId = item?.id || item?.local_id || String(index);
        const itemIndex = index ?? 0;

        return (
            <Draggable draggableId={draggableId} index={itemIndex}>
                {(provided, snapshot) => (
                    <div
                        className='flex w-full items-center gap-2'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided?.draggableProps?.style, disabled)}>
                        <div className='flex-1'>{children}</div>
                    </div>
                )}
            </Draggable>
        );
    },
    (prevProps, nextProps) =>
        prevProps.item?.id === nextProps.item?.id &&
        prevProps.item?.local_id === nextProps.item?.local_id &&
        prevProps.index === nextProps.index
);

DraggableItem.displayName = 'DraggableItem';
