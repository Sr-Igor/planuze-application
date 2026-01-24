import { DropResult } from 'react-beautiful-dnd';

export interface IProviderProps {
    items: any[];
    setOrder: (items: any[]) => void;
    children: React.ReactNode;
    onDragEnd?: (result: DropResult) => void;
}

export interface DraggableItemProps {
    item: any;
    index?: number;
    children: React.ReactNode;
    disabled?: boolean;
}
