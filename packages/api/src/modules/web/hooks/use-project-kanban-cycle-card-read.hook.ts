import { useMutation } from "@tanstack/react-query";

import type { project_kanban_cycle_card, project_kanban_cycle_card_read } from "@repo/types";

import { useCache } from "../../../infrastructure/cache/cache.service";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import {
  projectKanbanCycleCardReadEndpoint,
  type ProjectKanbanCycleCardReadStoreBody,
} from "../endpoints/project_kanban_cycle_card_read";

export interface UseProjectKanbanCycleCardReadCallbacks {
  store?: {
    onSuccess?: (data: project_kanban_cycle_card_read) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseProjectKanbanCycleCardReadProps {
  cardId?: string;
  callbacks?: UseProjectKanbanCycleCardReadCallbacks;
}

export const useProjectKanbanCycleCardRead = ({
  callbacks,
  cardId,
}: UseProjectKanbanCycleCardReadProps = {}) => {
  const showKey = cacheKeys.project_kanban_cycle_card.show(cardId);
  const cache = useCache();

  const store = useMutation({
    mutationFn: (body: ProjectKanbanCycleCardReadStoreBody) =>
      projectKanbanCycleCardReadEndpoint.store(body),
    onSuccess: (e) => {
      try {
        cache.setQueryData(showKey, (old: project_kanban_cycle_card | undefined) => {
          if (!old) return old as unknown as project_kanban_cycle_card;

          return {
            ...old,
            project_kanban_cycle_card_reads: [e, ...(old.project_kanban_cycle_card_reads || [])],
          };
        });
      } finally {
        callbacks?.store?.onSuccess?.(e);
      }
    },
    onError: callbacks?.store?.onError,
  });

  return { store };
};
