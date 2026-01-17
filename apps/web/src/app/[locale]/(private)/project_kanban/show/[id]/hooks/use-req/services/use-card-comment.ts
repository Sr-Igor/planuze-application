import { project_kanban_cycle_card_comment } from "@repo/types";

import { useProjectKanbanCycleCardComment } from "@repo/api/web/callers/project_kanban_cycle_card_comment";
import { IUseCallerProps } from "@repo/api/web/types";

export interface IUseCardCommentProps {
  cardId: string;
  id?: string;
  callbacks: IUseCallerProps<project_kanban_cycle_card_comment>["callbacks"];
}

export const useCardComment = ({ id, cardId, callbacks }: IUseCardCommentProps) => {
  const requests = useProjectKanbanCycleCardComment({
    id,
    cardId,
    callbacks,
  });

  return requests;
};
