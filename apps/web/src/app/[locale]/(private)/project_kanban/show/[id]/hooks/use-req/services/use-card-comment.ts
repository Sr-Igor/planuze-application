import { useProjectKanbanCycleCardComment } from '@/api/callers/project_kanban_cycle_card_comment';
import { project_kanban_cycle_card_comment } from '@/api/generator/types';
import { IUseCallerProps } from '@/api/types';

export interface IUseCardCommentProps {
    cardId: string;
    id?: string;
    callbacks: IUseCallerProps<project_kanban_cycle_card_comment>['callbacks'];
}

export const useCardComment = ({ id, cardId, callbacks }: IUseCardCommentProps) => {
    const requests = useProjectKanbanCycleCardComment({
        id,
        cardId,
        callbacks
    });

    return requests;
};
