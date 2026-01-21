/**
 * Project financial placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_financial } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectFinancial = (id: string, num: number): project_financial => ({
  id,
  company_id: id,
  work_type_id: id,
  currency: "BRL",
  cycles: num,
  title: "1",
  total_value: num,
  discount: num,
  project_version_id: id,
  project_id: id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  deletedAt: null,
});

export const projectFinancialPlaceholder: Pagination<project_financial> = {
  data: [
    createProjectFinancial("1", 1),
    createProjectFinancial("2", 2),
    createProjectFinancial("3", 3),
    createProjectFinancial("4", 4),
    createProjectFinancial("5", 5),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
