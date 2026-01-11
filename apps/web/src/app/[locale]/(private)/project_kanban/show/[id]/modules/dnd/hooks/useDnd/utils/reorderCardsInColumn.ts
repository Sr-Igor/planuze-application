import { project_kanban_cycle } from '@/api/generator/types';
import { arrayMove } from '@dnd-kit/sortable';

export interface IReorderCardsInColumnProps {
    columnId: string;
    activeCardId: string | number;
    overCardId: string | number;
    cycle?: project_kanban_cycle | null;
}

export const reorderCardsInColumn = ({
    columnId,
    activeCardId,
    overCardId,
    cycle
}: IReorderCardsInColumnProps): project_kanban_cycle => {
    const columns = cycle?.project_kanban_cycle_columns;
    const column = columns?.find((col) => col.id === columnId);
    if (!column) return cycle!;

    const activeIndex = column.project_kanban_cycle_cards?.findIndex((card) => card.id === activeCardId);
    const overIndex = column.project_kanban_cycle_cards?.findIndex((card) => card.id === overCardId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === undefined || overIndex === undefined) return cycle!;

    const newCards = arrayMove(column?.project_kanban_cycle_cards || [], activeIndex, overIndex);

    const newColumns = columns?.map((col) =>
        col.id === columnId ? { ...col, project_kanban_cycle_cards: newCards } : col
    );

    return { ...cycle!, project_kanban_cycle_columns: newColumns };
};
