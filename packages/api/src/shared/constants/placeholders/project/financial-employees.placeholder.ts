/**
 * Project financial employees placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_financial_employees } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectFinancialEmployees = (id: string, num: number): project_financial_employees => ({
  id,
  project_financial_id: id,
  role_id: id,
  quantity: num,
  company_id: id,
  project_id: id,
  unit_value: 100,
  currency: "BRL",
  deleted: false,
  deletedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const projectFinancialEmployeesPlaceholder: Pagination<project_financial_employees> = {
  data: [
    createProjectFinancialEmployees("1", 1),
    createProjectFinancialEmployees("2", 2),
    createProjectFinancialEmployees("3", 3),
    createProjectFinancialEmployees("4", 4),
    createProjectFinancialEmployees("5", 5),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
