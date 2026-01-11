import { project_kanban_cycle, project_kanban_cycle_card } from '@/api/generator/types';

import { IUseDndProps } from '../../../types';
import { reorderCardsInSameTask } from '../../../utils/reorderInSameTask';

type SamePrincipalSameColumnProps = {
    card: project_kanban_cycle_card;
    overCard: project_kanban_cycle_card;
    cycle?: project_kanban_cycle | null;
    onBoardUpdate?: IUseDndProps['onBoardUpdate'];
};

export const samePrincipalSameColumn = ({ card, overCard, cycle, onBoardUpdate }: SamePrincipalSameColumnProps) => {
    // Usar função específica para reordenação dentro da mesma task
    const { board: newBoard, changed } = reorderCardsInSameTask({
        columnId: card.project_kanban_cycle_column_id,
        activeCardId: card.id,
        overCardId: overCard.id,
        taskMainId: card.card_id, // Remover o ! para permitir null (unlinked)
        cycle
    });

    if (changed && onBoardUpdate) {
        // Encontrar o card atualizado
        const updatedCard = newBoard.project_kanban_cycle_columns
            ?.find((col) => col.id === card.project_kanban_cycle_column_id)
            ?.project_kanban_cycle_cards?.find((c) => c.id === card.id);

        if (updatedCard) {
            onBoardUpdate({ board: newBoard, item: updatedCard, type: 'card', moment: 'secondary' });
        }
    }

    return true;
};
