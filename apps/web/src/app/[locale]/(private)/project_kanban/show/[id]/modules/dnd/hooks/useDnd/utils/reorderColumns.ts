import { project_kanban_cycle, project_kanban_cycle_column } from '@/api/generator/types';
import { arrayMove } from '@dnd-kit/sortable';

export interface IReorderColumnsProps {
    activeColumnId: string | number;
    overColumnId: string | number;
    cycle?: project_kanban_cycle | null;
}

export interface IReturnReorderColumns {
    board: project_kanban_cycle;
    changed: boolean;
}

export const reorderColumns = ({
    activeColumnId,
    overColumnId,
    cycle
}: IReorderColumnsProps): IReturnReorderColumns => {
    const columns = cycle?.project_kanban_cycle_columns;
    if (!columns || columns.length === 0) {
        return { board: cycle!, changed: false };
    }

    const activeIndex = columns.findIndex((col) => col.id === activeColumnId);
    const overIndex = columns.findIndex((col) => col.id === overColumnId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
        return { board: cycle!, changed: false };
    }

    // Criar uma cópia das colunas e reordenar
    const columnsArray = [...columns];
    const newColumns = arrayMove(columnsArray, activeIndex, overIndex);

    // Atualizar as ordens baseado na nova posição
    const updatedColumns = newColumns.map((column, index) => ({
        ...column,
        order: index + 1 // Order é 1-indexed
    }));

    return {
        board: { ...cycle!, project_kanban_cycle_columns: updatedColumns },
        changed: true
    };
};
