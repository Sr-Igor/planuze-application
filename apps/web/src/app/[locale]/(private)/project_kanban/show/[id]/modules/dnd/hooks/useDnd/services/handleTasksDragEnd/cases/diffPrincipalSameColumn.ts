import { project_kanban_cycle, project_kanban_cycle_card } from '@/api/generator/types';

import { IUseDndProps } from '../../../types';
import { moveSubCardBetweenTaskColumns } from '../../../utils/moveSubCardBetweenTaskColumns';

type DiffPrincipalSameColumnProps = {
    card: project_kanban_cycle_card;
    overCard: project_kanban_cycle_card;
    cycle?: project_kanban_cycle | null;
    onBoardUpdate?: IUseDndProps['onBoardUpdate'];
};

export const diffPrincipalSameColumn = ({ card, overCard, cycle, onBoardUpdate }: DiffPrincipalSameColumnProps) => {
    // Calcular posição de inserção baseada no card de destino
    const targetColumn = cycle?.project_kanban_cycle_columns?.find(
        (col) => col.id === overCard.project_kanban_cycle_column_id
    );

    if (targetColumn) {
        // Obter cards da nova task principal (excluindo o card que está sendo movido)
        const targetTaskCards =
            targetColumn.project_kanban_cycle_cards?.filter((c) => {
                // Para cards unlinked, comparar com null, senão comparar com o card_id
                if (overCard.card_id === null) {
                    return c.card_id === null && c.id !== card.id;
                }
                return c.card_id === overCard.card_id && c.id !== card.id;
            }) || [];

        // Encontrar a posição do card de destino
        const overCardIndex = targetTaskCards.findIndex((c) => c.id === overCard.id);
        const insertIndex = overCardIndex !== -1 ? overCardIndex : targetTaskCards.length;

        // Se o overCard.card_id for 'unlinked', definir card_id como nulo
        const finalTargetMainTaskId = overCard.card_id === 'unlinked' ? null : overCard.card_id;

        // Usar função otimista para mover o card
        const { board: newBoard, changed } = moveSubCardBetweenTaskColumns({
            cardId: card.id,
            sourceColumnId: card.project_kanban_cycle_column_id,
            targetColumnId: overCard.project_kanban_cycle_column_id,
            targetMainTaskId: finalTargetMainTaskId,
            insertIndex,
            cycle
        });

        if (changed && onBoardUpdate) {
            // Encontrar o card atualizado no novo board
            const updatedCard = newBoard.project_kanban_cycle_columns
                ?.find((col) => col.id === overCard.project_kanban_cycle_column_id)
                ?.project_kanban_cycle_cards?.find((c) => c.id === card.id);

            if (updatedCard) {
                onBoardUpdate({ board: newBoard, item: updatedCard, type: 'card', moment: 'secondary' });
            }
        }
    }

    return true;
};
