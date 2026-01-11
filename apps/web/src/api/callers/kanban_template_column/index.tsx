import { useMutation } from "@tanstack/react-query";

import { kanban_template, kanban_template_column } from "@repo/api/generator/types";

import { useCache } from "@/api/cache";
import keys from "@/api/cache/keys";
import { useNestedArray } from "@/api/hooks/use-nested-array";
import * as api from "@/api/req/kanban_template_column";
import { IUseCallerProps } from "@/api/types";

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
