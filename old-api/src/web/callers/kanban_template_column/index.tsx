import * as api from "#/web/req/kanban_template_column";
import { useCache } from "#/cache";
import keys from "#/cache/keys";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";
import { useMutation } from "@tanstack/react-query";

import { kanban_template, kanban_template_column } from "@repo/types";

export const useKanbanTemplateColumn = (props: IUseCallerProps<kanban_template_column>) => {
  const cache = useCache();
  const showKey = keys.kanban_template.show(props.filters?.kanban_template_id);

  const requests = useNestedArray({
    ...props,
    api,
    rootCache: "kanban_template",
    cache: "kanban_template_column",
    field: "kanban_template_columns",
    accessKey: props.filters?.kanban_template_id,
    nestedArrayOptions: {
      orderKey: "order",
      orderValue: "asc",
      dataType: "number",
    },
  });

  const many = useMutation({
    mutationFn: (data: { ids: string; body: any }) => api.many(data.ids, data.body),
    onSuccess: (e) => {
      cache.setQueriesData(showKey, (oldData: kanban_template) => {
        return {
          ...oldData,
          kanban_template_columns: e.sort((a: any, b: any) => b.order - a.order),
        };
      });
      props.callbacks?.many?.onSuccess?.(e);
    },
    onError: props.callbacks?.many?.onError,
  });

  return { ...requests, many };
};
