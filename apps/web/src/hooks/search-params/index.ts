import { useCallback, useMemo, useTransition } from "react";

import { useSearchParams as useNextSearchParams, usePathname, useRouter } from "next/navigation";

import { z } from "zod";

import { SearchParamsUtils } from "./utils";

export interface UseSearchParamsOptions<T> {
  schema: z.ZodSchema<T>;
  replace?: boolean;
  shallow?: boolean;
  scroll?: boolean;
}

export function useSearchParams<T>(options: UseSearchParamsOptions<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentParams = useMemo(() => {
    return SearchParamsUtils.parseWithSchema(searchParams, options.schema);
  }, [searchParams, options.schema]);

  const setParams = useCallback(
    (updates: Partial<T> | ((current: T) => Partial<T>), replaceAll = false) => {
      startTransition(() => {
        try {
          const updatesValue = typeof updates === "function" ? updates(currentParams) : updates;

          const newSearchParams = SearchParamsUtils.merge(
            searchParams,
            updatesValue as Record<string, any>,
            replaceAll
          );

          const url = SearchParamsUtils.createUrl(pathname, Object.fromEntries(newSearchParams));

          if (options.replace !== false) {
            router.replace(url, { scroll: options.scroll });
          } else {
            router.push(url, { scroll: options.scroll });
          }
        } catch (error) {
          console.error("Error while updating search params:", error);
        }
      });
    },
    [currentParams, searchParams, pathname, router, options.replace, options.scroll]
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      startTransition(() => {
        try {
          const newSearchParams = SearchParamsUtils.remove(searchParams, keys);
          const url = SearchParamsUtils.createUrl(pathname, Object.fromEntries(newSearchParams));

          if (options.replace !== false) {
            router.replace(url, { scroll: options.scroll });
          } else {
            router.push(url, { scroll: options.scroll });
          }
        } catch (error) {
          console.error("Error while removing search params:", error);
        }
      });
    },
    [searchParams, pathname, router, options.replace, options.scroll]
  );

  const resetParams = useCallback(
    (keepParams: Partial<T> = {}) => {
      startTransition(() => {
        try {
          const defaultValues = options.schema.parse({ ...keepParams });
          const newSearchParams = SearchParamsUtils.serialize(defaultValues as Record<string, any>);
          const url = SearchParamsUtils.createUrl(pathname, Object.fromEntries(newSearchParams));

          if (options.replace !== false) {
            router.replace(url, { scroll: options.scroll });
          } else {
            router.push(url, { scroll: options.scroll });
          }
        } catch (error) {
          console.error("Error to reset search params:", error);
        }
      });
    },
    [options.schema, pathname, router, options.replace, options.scroll]
  );

  const getParam = useCallback(
    <K extends keyof T>(key: K): T[K] => {
      return currentParams[key];
    },
    [currentParams]
  );

  const isInitialState = useMemo(() => {
    try {
      const defaultValues = options.schema.parse({});
      return JSON.stringify(currentParams) === JSON.stringify(defaultValues);
    } catch {
      return false;
    }
  }, [currentParams, options.schema]);

  const currentUrl = useMemo(() => {
    return SearchParamsUtils.createUrl(pathname, currentParams as any);
  }, [pathname, currentParams]);

  return {
    params: currentParams,
    isPending,
    isInitialState,
    currentUrl,
    setParams,
    removeParams,
    resetParams,
    getParam,
    rawSearchParams: searchParams,
  };
}

export function usePaginationParams(schema: z.ZodSchema<any>) {
  return useSearchParams({
    schema,
    replace: true,
    scroll: false,
  });
}
