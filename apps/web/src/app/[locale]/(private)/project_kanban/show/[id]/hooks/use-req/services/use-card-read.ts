import {
  useProjectKanbanCycleCardRead,
  UseProjectKanbanCycleCardReadCallbacks,
} from "@repo/api/web";

export interface IUseCardReadProps {
  cardId: string;
  callbacks?: UseProjectKanbanCycleCardReadCallbacks;
}

export const useCardRead = ({ cardId, callbacks }: IUseCardReadProps) => {
  const requests = useProjectKanbanCycleCardRead({
    cardId,
    callbacks,
  });

  return requests;
};
