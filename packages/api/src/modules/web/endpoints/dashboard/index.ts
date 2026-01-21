import { typedRequest } from "../../../../infrastructure/http/axios-client";
import { exportXlsx } from "../../../../shared/services/export/export-xlsx.service";

/**
 * Dashboard endpoints
 */
export const dashboardEndpoint = {
  /**
   * Get dashboard data
   */
  index: <T = unknown>(filters?: Record<string, unknown>) =>
    typedRequest<T>()({
      route: "/api/private/dashboard/index",
      query: filters,
    }),

  /**
   * Export dashboard data to XLSX
   */
  export: (filters?: Record<string, unknown>) =>
    exportXlsx("/api/private/dashboard/index", filters),
};

// Direct function exports for backwards compatibility
export const dashboardIndex = dashboardEndpoint.index;
export const dashboardExport = dashboardEndpoint.export;
