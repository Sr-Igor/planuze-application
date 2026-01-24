import type { project_financial_employees } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectFinancialEmployeesEndpoint =
  createSimpleEndpoint<project_financial_employees>()({
    basePath: "/api/private/project_financial_employees",
    routes: {
      index: "/api/private/project_financial_employees/index",
      store: "/api/private/project_financial_employees/store",
      update: "/api/private/project_financial_employees/update",
      destroy: "/api/private/project_financial_employees/destroy",
      many: "/api/private/project_financial_employees/many",
      restore: "/api/private/project_financial_employees/restore",
    },
    defaultQuery: {
      include: {
        logs,
        project_financial: {
          include: {
            project_version: true,
            work_type: true,
          },
        },
      },
    },
  });

export type ProjectFinancialEmployees = project_financial_employees;

// Direct function exports for backwards compatibility
export const projectFinancialEmployeesIndex = projectFinancialEmployeesEndpoint.index;
export const projectFinancialEmployeesStore = projectFinancialEmployeesEndpoint.store;
export const projectFinancialEmployeesUpdate = projectFinancialEmployeesEndpoint.update;
export const projectFinancialEmployeesDestroy = projectFinancialEmployeesEndpoint.destroy;
export const projectFinancialEmployeesMany = projectFinancialEmployeesEndpoint.many;
export const projectFinancialEmployeesRestore = projectFinancialEmployeesEndpoint.restore;
