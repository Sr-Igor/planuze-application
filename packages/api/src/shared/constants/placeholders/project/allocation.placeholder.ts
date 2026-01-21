/**
 * Project allocation placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_allocation } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectAllocation = (id: string): project_allocation => ({
  id,
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  profile_id: id,
  project_version_id: id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  deletedAt: null,
  project_id: id,
  company_id: id,
});

export const projectAllocationPlaceholder: Pagination<project_allocation> = {
  data: [
    createProjectAllocation("1"),
    createProjectAllocation("2"),
    createProjectAllocation("3"),
    createProjectAllocation("4"),
    createProjectAllocation("5"),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
