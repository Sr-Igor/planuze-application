import { useQueryClient } from "@tanstack/react-query";

import { Pagination } from "../@types";

// Re-export keys
export { default as keys } from "./keys";

export interface ICache extends Omit<IQuerySort, "data"> {
  key: string | string[];
  access?: string;
  item: any;
  refetch?: boolean;
}

export interface IQuerySort {
  data: any[];
  orderKey?: string;
  orderValue?: "asc" | "desc";
  dataType?: "date" | "number" | "string";
}

export const useCache = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (key: string | string[]) => {
    queryClient.refetchQueries({ queryKey: [...(Array.isArray(key) ? key : [key])] });
  };

  const querySort = ({
    data,
    orderKey = "createdAt",
    orderValue = "desc",
    dataType = "date",
  }: IQuerySort) => {
    const sorted = data.sort((a, b) => {
      if (orderKey && orderValue) {
        if (dataType === "date") {
          return orderValue === "asc"
            ? new Date(a?.[orderKey])?.getTime() - new Date(b?.[orderKey])?.getTime()
            : new Date(b?.[orderKey])?.getTime() - new Date(a?.[orderKey])?.getTime();
        }

        if (dataType === "number") {
          return orderValue === "asc"
            ? a?.[orderKey] - b?.[orderKey]
            : b?.[orderKey] - a?.[orderKey];
        }

        return orderValue === "asc" ? a?.[orderKey] - b?.[orderKey] : b?.[orderKey] - a?.[orderKey];
      }

      return 0;
    });

    return sorted;
  };

  return {
    insertInIndex: ({
      key,
      access = "data",
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [access]: querySort({
            data: [item, ...(oldData?.[access] || [])],
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    updateInIndex: ({
      key,
      access = "data",
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [access]: querySort({
            data: (oldData?.data || []).map((i: any) => (i.id === item.id ? item : i)),
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    destroyInIndex: ({
      key,
      access = "data",
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [access]: querySort({
            data: (oldData?.data || []).filter((i: any) => i.id !== item.id),
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    replaceShow: ({
      key,
      item,
    }: Omit<ICache, "access" | "orderKey" | "orderValue" | "refetch">) => {
      queryClient.setQueryData(Array.isArray(key) ? key : [key], (old: any) => ({
        ...(old || {}),
        ...item,
      }));
    },
    updateNestedField: ({ key, field, item, refetch = true }: ICache & { field: string }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [field]: item,
        };
      });
      if (refetch) refetchQuery(key);
    },
    insertNestedField: ({ key, field, item, refetch = true }: ICache & { field: string }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [field]: item,
        };
      });
      if (refetch) refetchQuery(key);
    },
    insertInNestedArray: ({
      key,
      field,
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache & { field: string }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [field]: querySort({
            data: [item, ...(oldData?.[field] || [])],
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    updateInNestedArray: ({
      key,
      field,
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache & { field: string }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [field]: querySort({
            data: (oldData?.[field] || []).map((i: any) => (i.id === item.id ? item : i)),
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    destroyInNestedArray: ({
      key,
      field,
      item,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: ICache & { field: string }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        return {
          ...oldData,
          [field]: querySort({
            data: (oldData?.[field] || []).filter((i: any) => i.id !== item.id),
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    // Métodos que forçam loading state imediatamente
    invalidateIndex: (key: string | string[]) => {
      const queryKey = Array.isArray(key) ? [key[0], key[1] || {}] : [key];

      // Remove a query do cache para forçar loading
      queryClient.removeQueries({ queryKey });
      // Refetch imediatamente
      queryClient.refetchQueries({ queryKey });
    },
    invalidateShow: (key: string | string[]) => {
      const queryKey = Array.isArray(key) ? [key[0], key[1] || {}] : [key];
      // Remove a query do cache para forçar loading
      queryClient.removeQueries({ queryKey });
      // Refetch imediatamente
      queryClient.refetchQueries({ queryKey });
    },
    invalidateTrash: (key: string | string[]) => {
      const queryKey = Array.isArray(key) ? [key[0], key[1] || {}] : [key];
      // Remove a query do cache para forçar loading
      queryClient.removeQueries({ queryKey });
      // Refetch imediatamente
      queryClient.refetchQueries({ queryKey });
    },
    // Método para filtrar e substituir itens em arrays aninhados por critério específico
    filterAndReplaceInNestedArray: ({
      key,
      field,
      items,
      filterKey,
      filterValue,
      orderKey,
      orderValue,
      dataType,
      refetch = true,
    }: Omit<ICache, "item"> & {
      field: string;
      items: any[];
      filterKey: string;
      filterValue: any;
    }) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        // Filtra itens existentes que NÃO atendem ao critério
        const filteredItems = (oldData?.[field] || []).filter(
          (item: any) => item[filterKey] !== filterValue
        );

        return {
          ...oldData,
          [field]: querySort({
            data: [...filteredItems, ...items],
            orderKey,
            orderValue,
            dataType,
          }),
        };
      });
      if (refetch) refetchQuery(key);
    },
    // Métodos centralizados para operações diretas do queryClient
    invalidateQueries: (queryKey: string | string[]) => {
      queryClient.removeQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });

      queryClient.refetchQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
    },
    setQueryData: (queryKey: string | string[], updater: any) => {
      queryClient.setQueryData(Array.isArray(queryKey) ? queryKey : [queryKey], updater);
    },
    setQueriesData: (queryKey: string | string[], updater: any) => {
      queryClient.setQueriesData(
        { queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] },
        updater
      );
    },
    refetchQueries: (queryKey: string | string[]) => {
      queryClient.refetchQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
    },
    // Método para atualização suave sem loading - apenas atualiza o item encontrado
    updateItemInIndex: ({ key, access = "data", item, refetch = true }: ICache) => {
      queryClient.setQueriesData({ queryKey: key }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          [access]: (oldData?.[access] || []).map((i: any) => (i.id === item.id ? item : i)),
        };
      });
      if (refetch) refetchQuery(key);
    },
    replaceIndex: <T>({ key, data }: Pick<ICache, "key"> & { data: Pagination<T> }) => {
      queryClient.setQueriesData({ queryKey: key }, () => data);
    },
  };
};
