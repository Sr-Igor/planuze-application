import { project_kanban_cycle_card, project_kanban_cycle_column } from '@/api/generator/types';

import { Position } from '../../../hooks/useDnd/types';

export interface ITaskRowColumnProps {
    column: project_kanban_cycle_column;
    subTasks: project_kanban_cycle_card[];
    insertPosition?: Position | null;
    isDragActive?: boolean;
    mainTaskId: string;
    activeCard?: project_kanban_cycle_card | null;
    loading: boolean;
}
