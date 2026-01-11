import { useProjectKanbanCycleCardRead } from '@/api/callers/project_kanban_cycle_card_read';
import { project_kanban_cycle_card_read } from '@/api/generator/types';
import { IUseCallerProps } from '@/api/types';

export interface IUseCardReadProps {
    cardId: string;
    id?: string;
    callbacks: IUseCallerProps<project_kanban_cycle_card_read>['callbacks'];
}

export const useCardRead = ({ id, cardId, callbacks }: IUseCardReadProps) => {
    const requests = useProjectKanbanCycleCardRead({
        id,
        cardId,
        callbacks
    });

    return requests;
};
