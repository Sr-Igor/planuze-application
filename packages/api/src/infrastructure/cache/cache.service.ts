import { useQueryClient } from "@tanstack/react-query";

import type { Pagination } from "@repo/types";

/**
 * Sorting options for cache
 */
export interface SortOptions {
  orderKey?: string;
  orderValue?: "asc" | "desc";
  dataType?: "date" | "number" | "string";
}

/**
 * Options for cache operations
 */
export interface CacheOptions extends SortOptions {
  key: string[];
  access?: string;
  item: unknown;
  refetch?: boolean;
}

/**
 * Options for nested array operations
 */
export interface NestedCacheOptions extends CacheOptions {
  field: string;
}

/**
 * Sorts an array of data
 */
const sortData = <T extends Record<string, unknown>>(data: T[], options: SortOptions): T[] => {
  const { orderKey = "createdAt", orderValue = "desc", dataType = "date" } = options;

  return [...data].sort((a, b) => {
    const aValue = a[orderKey];
    const bValue = b[orderKey];

    if (dataType === "date") {
      const aTime = new Date(aValue as string).getTime();
      const bTime = new Date(bValue as string).getTime();
      return orderValue === "asc" ? aTime - bTime : bTime - aTime;
    }

    if (dataType === "number") {
      return orderValue === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }

    return orderValue === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};

/**
 * Hook for cache operations with React Query
 */
export const useCache = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (key: string[]) => {
    queryClient.refetchQueries({ queryKey: key });
  };

  return {
    /**
     * Inserts an item in the index
     */
    insertInIndex: (options: CacheOptions) => {
      const { key, access = "data", item, refetch = true, ...sortOptions } = options;

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, unknown[]> | undefined;
        return {
          ...data,
          [access]: sortData(
            [item, ...(data?.[access] || [])] as Record<string, unknown>[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Updates an item in the index
     */
    updateInIndex: (options: CacheOptions) => {
      const { key, access = "data", item, refetch = true, ...sortOptions } = options;
      const typedItem = item as { id: string };

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<{ id: string }>> | undefined;
        return {
          ...data,
          [access]: sortData(
            (data?.[access] || []).map((i) => (i.id === typedItem.id ? typedItem : i)) as Record<
              string,
              unknown
            >[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Removes an item from the index
     */
    destroyInIndex: (options: CacheOptions) => {
      const { key, access = "data", item, refetch = true, ...sortOptions } = options;
      const typedItem = item as { id: string };

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<{ id: string }>> | undefined;
        return {
          ...data,
          [access]: sortData(
            (data?.[access] || []).filter((i) => i.id !== typedItem.id) as Record<
              string,
              unknown
            >[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Replaces show data
     */
    replaceShow: (options: Pick<CacheOptions, "key" | "item">) => {
      const { key, item } = options;
      queryClient.setQueryData(key, (old: unknown) => ({
        ...((old as object) || {}),
        ...(item as object),
      }));
    },

    /**
     * Replaces the entire index
     */
    replaceIndex: <T>(options: { key: string[]; data: Pagination<T> }) => {
      const { key, data } = options;
      queryClient.setQueriesData({ queryKey: key }, () => data);
    },

    /**
     * Inserts in nested array
     */
    insertInNestedArray: (options: NestedCacheOptions) => {
      const { key, field, item, refetch = true, ...sortOptions } = options;

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, unknown[]> | undefined;
        return {
          ...data,
          [field]: sortData(
            [item, ...(data?.[field] || [])] as Record<string, unknown>[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Updates in nested array
     */
    updateInNestedArray: (options: NestedCacheOptions) => {
      const { key, field, item, refetch = true, ...sortOptions } = options;
      const typedItem = item as { id: string };

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<{ id: string }>> | undefined;
        return {
          ...data,
          [field]: sortData(
            (data?.[field] || []).map((i) => (i.id === typedItem.id ? typedItem : i)) as Record<
              string,
              unknown
            >[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Removes from nested array
     */
    destroyInNestedArray: (options: NestedCacheOptions) => {
      const { key, field, item, refetch = true, ...sortOptions } = options;
      const typedItem = item as { id: string };

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<{ id: string }>> | undefined;
        return {
          ...data,
          [field]: sortData(
            (data?.[field] || []).filter((i) => i.id !== typedItem.id) as Record<string, unknown>[],
            sortOptions
          ),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Invalidates and refetches index query
     */
    invalidateIndex: (key: string[]) => {
      queryClient.removeQueries({ queryKey: key });
      queryClient.refetchQueries({ queryKey: key });
    },

    /**
     * Invalidates and refetches show query
     */
    invalidateShow: (key: string[]) => {
      queryClient.removeQueries({ queryKey: key });
      queryClient.refetchQueries({ queryKey: key });
    },

    /**
     * Invalidates and refetches trash query
     */
    invalidateTrash: (key: string[]) => {
      queryClient.removeQueries({ queryKey: key });
      queryClient.refetchQueries({ queryKey: key });
    },

    /**
     * Invalidates generic queries
     */
    invalidateQueries: (key: string[]) => {
      queryClient.removeQueries({ queryKey: key });
      queryClient.refetchQueries({ queryKey: key });
    },

    /**
     * Sets query data
     */
    setQueryData: <T>(key: string[], updater: T | ((old: T | undefined) => T | undefined)) => {
      queryClient.setQueryData(key, updater);
    },

    /**
     * Sets multiple queries data
     */
    setQueriesData: <T>(key: string[], updater: (old: T | undefined) => T | undefined) => {
      queryClient.setQueriesData({ queryKey: key }, updater);
    },

    /**
     * Refetches queries
     */
    refetchQueries: (key: string[]) => {
      queryClient.refetchQueries({ queryKey: key });
    },

    /**
     * Inserts a nested field (single object, not array)
     */
    insertNestedField: (options: NestedCacheOptions) => {
      const { key, field, item, refetch = true } = options;

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, unknown> | undefined;
        return {
          ...data,
          [field]: item,
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Updates a nested field (single object, not array)
     */
    updateNestedField: (options: NestedCacheOptions) => {
      const { key, field, item, refetch = true } = options;

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, unknown> | undefined;
        return {
          ...data,
          [field]: item,
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Filters and replaces items in nested array by criteria
     */
    filterAndReplaceInNestedArray: (
      options: Omit<NestedCacheOptions, "item"> & {
        items: unknown[];
        filterKey: string;
        filterValue: unknown;
      }
    ) => {
      const { key, field, items, filterKey, filterValue, refetch = true, ...sortOptions } = options;

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<Record<string, unknown>>> | undefined;
        const filteredItems = (data?.[field] || []).filter(
          (item) => item[filterKey] !== filterValue
        );

        return {
          ...data,
          [field]: sortData([...filteredItems, ...items] as Record<string, unknown>[], sortOptions),
        };
      });

      if (refetch) refetchQuery(key);
    },

    /**
     * Updates item in index without triggering loading state
     */
    updateItemInIndex: (options: CacheOptions) => {
      const { key, access = "data", item, refetch = true } = options;
      const typedItem = item as { id: string };

      queryClient.setQueriesData({ queryKey: key }, (oldData: unknown) => {
        const data = oldData as Record<string, Array<{ id: string }>> | undefined;
        if (!data) return data;

        return {
          ...data,
          [access]: (data?.[access] || []).map((i) => (i.id === typedItem.id ? typedItem : i)),
        };
      });

      if (refetch) refetchQuery(key);
    },
  };
};

export type CacheService = ReturnType<typeof useCache>;
