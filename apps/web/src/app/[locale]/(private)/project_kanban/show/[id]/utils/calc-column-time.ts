import { project_kanban_cycle_column } from '@/api/generator/types';

import { checkVisibility } from '../modules/dnd/hooks/useDnd/utils/isVisible';
import { VisibleCards } from '../modules/dnd/types';

export const calcColumnTime = (column: project_kanban_cycle_column, visibleCards: VisibleCards) => {
    const time = {
        hour: 0,
        minute: 0
    };

    const cards = column.project_kanban_cycle_cards?.filter((card) => checkVisibility(card, visibleCards));

    cards?.forEach((card) => {
        switch (card.estimate_unit) {
            case 'hour':
                time.hour += card.estimate || 0;
                break;
            case 'minute':
                time.minute += card.estimate || 0;
                break;
            default:
                break;
        }
    });

    return time;
};
