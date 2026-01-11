import { project_kanban_cycle } from '@/api/generator/types';
import { DragEndEvent } from '@dnd-kit/core';

import { IUseDndProps, Position } from '../../types';

export interface IHandleTasksDragEndProps {
    event: DragEndEvent;
    cycle?: project_kanban_cycle | null;
    onBoardUpdate: IUseDndProps['onBoardUpdate'];
    updateInsertPosition: (insertPosition: Position | null) => void;
    insertPosition: Position | null;
}
