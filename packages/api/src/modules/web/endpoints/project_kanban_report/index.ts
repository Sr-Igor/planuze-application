import { typedRequest } from "../../../../infrastructure/http/axios-client";
import { exportXlsx } from "../../../../shared/services/export/export-xlsx.service";

/**
 * Project Kanban Report endpoints
 */
export const projectKanbanReportEndpoint = {
  /**
   * Get kanban report data
   */
  index: <T = unknown>(filters?: Record<string, unknown>) =>
    typedRequest<T>()({
      route: "/api/private/project_kanban_report/index",
      query: filters,
    }),

  /**
   * Export kanban report to XLSX
   */
  export: (filters?: Record<string, unknown>) =>
    exportXlsx("/api/private/project_kanban_report/index", filters),
};

// Direct function exports for backwards compatibility
export const projectKanbanReportIndex = projectKanbanReportEndpoint.index;
export const projectKanbanReportExport = projectKanbanReportEndpoint.export;
