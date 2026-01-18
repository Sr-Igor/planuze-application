import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSearchParams as useNextSearchParams, usePathname, useRouter } from "next/navigation";

import { z } from "zod";

import { useDebounce } from "@repo/hooks";

import { IParams } from "../types";

interface UseQueryOptimizedOptions {
  debounceMs?: number;
  enableCache?: boolean;
  maxCacheSize?: number;
  enablePerformanceMetrics?: boolean;
}

class QueryParamsCache {
  private cache = new Map<string, IParams>();
  private maxSize: number;

  constructor(maxSize = 50) {
    this.maxSize = maxSize;
  }

  get(key: string): IParams | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: IParams): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

const createCacheKey = (params: Record<string, any>): string => {
  return JSON.stringify(params);
};

const serializeParams = (params: Record<string, any>): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};

const deserializeParams = (searchParams: URLSearchParams): Record<string, any> => {
  const params: Record<string, any> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};

const createOptimizedSchema = () =>
  z.object({
    cycle: z.string().optional(),
    view: z.string().optional(),
    cardType: z.string().optional(),
    search: z.string().optional(),
    trash_search: z.string().optional(),
    objective: z.string().optional(),
    workType: z.string().optional(),
    public_id: z.string().optional(),
    description: z.string().optional(),
    tag: z.string().optional(),
    end_date_estimate_start: z.string().optional(),
    end_date_estimate_end: z.string().optional(),
    end_date_execute_start: z.string().optional(),
    end_date_execute_end: z.string().optional(),
    severity_min: z.string().optional(),
    severity_max: z.string().optional(),
    priority_min: z.string().optional(),
    priority_max: z.string().optional(),
    estimate_min: z.string().optional(),
    estimate_max: z.string().optional(),
    execute_min: z.string().optional(),
    execute_max: z.string().optional(),
    work_in_progress_min: z.string().optional(),
    work_in_progress_max: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    orderKey: z.string().optional(),
    orderValue: z.string().optional(),
    member: z.string().optional(),
    list_search: z.string().optional(),
    list_cycle: z.string().optional(),
    list_cardType: z.string().optional(),
    list_workType: z.string().optional(),
    list_member: z.string().optional(),
    list_objective: z.string().optional(),
    list_end_date_estimate_start: z.string().optional(),
    list_end_date_estimate_end: z.string().optional(),
    list_end_date_execute_start: z.string().optional(),
    list_end_date_execute_end: z.string().optional(),
    list_startDate: z.string().optional(),
    list_endDate: z.string().optional(),
    list_severity_min: z.string().optional(),
    list_severity_max: z.string().optional(),
    list_priority_min: z.string().optional(),
    list_priority_max: z.string().optional(),
    list_estimate_min: z.string().optional(),
    list_estimate_max: z.string().optional(),
    list_execute_min: z.string().optional(),
    list_execute_max: z.string().optional(),
    list_work_in_progress_min: z.string().optional(),
    list_work_in_progress_max: z.string().optional(),
    list_public_id: z.string().optional(),
    list_version: z.string().optional(),
    list_description: z.string().optional(),
    list_tag: z.string().optional(),
    card_id: z.string().optional(),
    "select-profile": z.string().optional(),
    "select-work-type": z.string().optional(),
    "select-objective": z.string().optional(),
    "select-version": z.string().optional(),
    report_cycle: z.string().optional(),
    report_cardType: z.string().optional(),
    report_member: z.string().optional(),
    report_workType: z.string().optional(),
    report_objective: z.string().optional(),
    report_version: z.string().optional(),
    report_tab: z.string().optional(),
  });

export const useQueryOptimized = (options: UseQueryOptimizedOptions = {}) => {
  const {
    debounceMs = 300,
    enableCache = true,
    maxCacheSize = 50,
    enablePerformanceMetrics = false,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const cacheRef = useRef(new QueryParamsCache(maxCacheSize));

  const performanceRef = useRef({
    updateCount: 0,
    lastUpdateTime: 0,
    averageUpdateTime: 0,
  });

  const lastUpdateRef = useRef<string>("");

  const schema = useMemo(() => createOptimizedSchema(), []);
  const [internalParams, setInternalParams] = useState<IParams>(() => {
    const params = deserializeParams(searchParams);
    return schema.parse(params);
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const debouncedParams = useDebounce(internalParams, debounceMs);

  const updateUrl = useCallback(
    (params: IParams) => {
      if (enablePerformanceMetrics) {
        const startTime = performance.now();
        performanceRef.current.updateCount++;

        const updateUrlInternal = () => {
          try {
            const searchParams = serializeParams(params);
            const queryString = searchParams.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.replace(url, { scroll: false });

            if (enablePerformanceMetrics) {
              const endTime = performance.now();
              const updateTime = endTime - startTime;
              performanceRef.current.lastUpdateTime = updateTime;
              performanceRef.current.averageUpdateTime =
                (performanceRef.current.averageUpdateTime + updateTime) / 2;
            }
          } catch (error) {
            console.error("Error while updating URL:", error);
          } finally {
            setIsUpdating(false);
          }
        };

        updateUrlInternal();
      } else {
        try {
          const searchParams = serializeParams(params);
          const queryString = searchParams.toString();
          const url = queryString ? `${pathname}?${queryString}` : pathname;

          router.replace(url, { scroll: false });
        } catch (error) {
          console.error("Error while updating URL:", error);
        } finally {
          setIsUpdating(false);
        }
      }
    },
    [pathname, router, enablePerformanceMetrics]
  );

  useEffect(() => {
    const params = deserializeParams(searchParams);
    const parsedParams = schema.parse(params);
    const paramsString = JSON.stringify(parsedParams);

    if (paramsString !== lastUpdateRef.current) {
      lastUpdateRef.current = paramsString;
      setInternalParams(parsedParams);
    }
  }, [searchParams, schema]);

  useEffect(() => {
    if (debouncedParams) {
      const paramsString = JSON.stringify(debouncedParams);
      lastUpdateRef.current = paramsString;
      setIsUpdating(true);

      // Usar setTimeout para garantir que a atualização aconteça após a renderização
      const timeoutId = setTimeout(() => {
        updateUrl(debouncedParams);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [debouncedParams, updateUrl]);

  const setParams = useCallback(
    (updates: Partial<IParams>) => {
      let newParams: IParams;

      setInternalParams((prev) => {
        newParams = { ...prev };

        // Aplica as atualizações, removendo explicitamente parâmetros com valores vazios
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "") {
            delete newParams[key as keyof IParams];
          } else {
            (newParams as any)[key] = value;
          }
        });

        if (enableCache) {
          const cacheKey = createCacheKey(newParams);
          cacheRef.current.set(cacheKey, newParams);
        }

        return newParams;
      });
      // Apenas atualiza o estado interno - a URL será atualizada via debounce
    },
    [enableCache, updateUrl]
  );

  const resetParams = useCallback(() => {
    const defaultParams = schema.parse({});
    setInternalParams(defaultParams);
  }, [schema]);

  const getParam = useCallback(
    <K extends keyof IParams>(key: K): IParams[K] => {
      return internalParams[key];
    },
    [internalParams]
  );

  const removeParams = useCallback((keys: (keyof IParams)[]) => {
    setInternalParams((prev) => {
      const newParams = { ...prev };
      keys.forEach((key) => {
        delete newParams[key];
      });
      return newParams;
    });
  }, []);

  const finalParams = useMemo(
    () => ({
      view: "principal",
      report_tab: "cards",
      ...internalParams,
    }),
    [internalParams]
  );

  const performanceMetrics = useMemo(() => {
    if (!enablePerformanceMetrics) return null;

    return {
      updateCount: performanceRef.current.updateCount,
      lastUpdateTime: performanceRef.current.lastUpdateTime,
      averageUpdateTime: performanceRef.current.averageUpdateTime,
      cacheSize: cacheRef.current["cache"].size,
    };
  }, [enablePerformanceMetrics, internalParams]);

  return {
    params: finalParams,
    setParams,
    resetParams,
    getParam,
    removeParams,
    isUpdating,
    performanceMetrics,
    _internal: {
      internalParams,
      cache: cacheRef.current,
      clearCache: () => cacheRef.current.clear(),
    },
  };
};
