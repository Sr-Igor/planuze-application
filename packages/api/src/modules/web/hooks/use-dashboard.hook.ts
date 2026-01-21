import { useMutation, useQuery } from "@tanstack/react-query";

import type { QueryFilters } from "../../../core/domain/interfaces/endpoint.interface";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { dashboardEndpoint } from "../endpoints/dashboard";

export interface UseDashboardProps {
  filters?: QueryFilters & {
    convert_currency?: string;
    project_tab?: string;
    personal_tab?: string;
  };
  moduleId?: string;
  enabled?: boolean;
}

/**
 * Dashboard response type - generic to support different module responses
 * The actual type depends on the active module (project, personal, admin, etc.)
 */
export type DashboardIndexResponse = Record<string, unknown>;

export const useDashboard = <T = DashboardIndexResponse>({
  filters,
  moduleId,
  enabled = true,
}: UseDashboardProps = {}) => {
  const defaultCurrency = "BRL";

  // Process filters - remove tab keys and handle arrays
  const processedFilters = Object.keys(filters || {}).reduce(
    (acc, key) => {
      const deletedKeys = ["project_tab", "personal_tab"];
      if (deletedKeys.includes(key)) return acc;

      const value = (filters as Record<string, unknown>)?.[key];
      if (Array.isArray(value) ? value.length > 0 : value) {
        return {
          ...acc,
          [key]: Array.isArray(value) ? value.join(",") : value,
        };
      }
      return acc;
    },
    {
      convert_currency: filters?.convert_currency || defaultCurrency,
    }
  );

  const indexKey = cacheKeys.dashboard.index({
    moduleId,
    ...processedFilters,
  });

  const index = useQuery<T>({
    queryKey: indexKey,
    queryFn: () => dashboardEndpoint.index(processedFilters),
    enabled,
  });

  const exported = useMutation({
    mutationKey: cacheKeys.dashboard.export(processedFilters),
    mutationFn: () => dashboardEndpoint.export({ ...processedFilters, export: true }),
  });

  return { index, exported };
};
