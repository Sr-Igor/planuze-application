//Styles
import React, { useCallback } from 'react';

//React && Hooks
import { useDND } from '../hooks';
import { DragDropContext, Droppable } from '../lib';
//Types
import { IProviderProps } from '../types';
import { DropResult } from 'react-beautiful-dnd';

export const ProviderDND = ({ items, setOrder, children, onDragEnd }: IProviderProps) => {
    const { getListStyle } = useDND();

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;
            if (result.destination.index === result.source.index) return;

            const reorderedItems = reorder(items, result.source.index, result.destination.index);

            setOrder(reorderedItems);
            onDragEnd?.(result);
        },
        [items, setOrder, onDragEnd]
    );

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId='droppable'
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={true}
                direction='vertical'
                type='ITEM'>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
