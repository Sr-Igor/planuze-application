import { DragStartEvent } from '@dnd-kit/core';

import { ActiveItem } from '../../types';

export interface IHandleDragStartProps {
    setActiveItem: (activeItem: ActiveItem | null) => void;
    event: DragStartEvent;
}

export const handleDragStart = ({ event, setActiveItem }: IHandleDragStartProps) => {
    const { active } = event;
    const activeData = active.data.current;

    if (activeData?.type === 'card') {
        setActiveItem({ type: 'card', item: activeData.card });
    } else if (activeData?.type === 'column') {
        setActiveItem({ type: 'column', item: activeData.column });
    } else if (activeData?.type === 'main-task') {
        setActiveItem({ type: 'main-task', item: activeData.task });
    }
};
