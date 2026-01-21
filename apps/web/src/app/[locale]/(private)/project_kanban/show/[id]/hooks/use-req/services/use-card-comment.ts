import { UseCallerProps, useProjectKanbanCycleCardComment } from "@repo/api/web";
import { project_kanban_cycle_card_comment } from "@repo/types";

export interface IUseCardCommentProps {
  cardId: string;
  id?: string;
  callbacks: UseCallerProps<project_kanban_cycle_card_comment>["callbacks"];
}

export const useCardComment = ({ id, cardId, callbacks }: IUseCardCommentProps) => {
  const requests = useProjectKanbanCycleCardComment({
    id,
    filters: {
      project_kanban_cycle_card_id: cardId,
    },
    callbacks,
  });

  return requests;
};
