import { useMutation } from "@tanstack/react-query";

import type { kanban_template, kanban_template_column } from "@repo/types";

import {
  useNestedArray,
  type UseNestedArrayReturn,
} from "../../../application/hooks/use-nested-array.hook";
import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { kanbanTemplateColumnEndpoint } from "../endpoints/kanban_template_column";

/**
 * Hook for Kanban Template Column operations (nested in template)
 */
export const useKanbanTemplateColumn = (
  props: UseCallerProps<kanban_template_column>
): UseNestedArrayReturn<kanban_template_column> => {
  const { filters, id, enableTrash, callbacks } = props;

  const cache = useCache();
  const showKey = cacheKeys.kanban_template.show?.(filters?.kanban_template_id) || [];

  const base = useNestedArray<kanban_template_column>({
    endpoint: {
      store: kanbanTemplateColumnEndpoint.store,
      update: kanbanTemplateColumnEndpoint.update,
      destroy: kanbanTemplateColumnEndpoint.destroy,
      restore: kanbanTemplateColumnEndpoint.restore,
    },
    cacheKeys: cacheKeys.kanban_template_column,
    rootCacheKeys: cacheKeys.kanban_template,
    field: "kanban_template_columns",
    accessKey: filters?.kanban_template_id as string,
    id,
    filters,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });

  const many = useMutation<kanban_template_column[], Error, { ids: string; body: any }>({
    mutationFn: (data: { ids: string; body: any }) =>
      kanbanTemplateColumnEndpoint.many(data.ids, data.body) as Promise<kanban_template_column[]>,
    onSuccess: (e) => {
      cache.setQueriesData(showKey, (oldData: kanban_template) => {
        return {
          ...oldData,
          kanban_template_columns: e.toSorted((a: any, b: any) => b.order - a.order),
        };
      });
      props.callbacks?.many?.onSuccess?.(e);
    },
    onError: props.callbacks?.many?.onError,
  });

  return { ...base, many };
};
