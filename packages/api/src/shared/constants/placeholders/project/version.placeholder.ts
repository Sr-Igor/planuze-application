/**
 * Project version placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_version } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectVersion = (id: string, num: number): project_version => ({
  id,
  name: id,
  version: num,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  owner_id: id,
  deletedAt: null,
  project_id: id,
  company_id: id,
  original_start_date: new Date().toISOString(),
  original_end_date: new Date().toISOString(),
  real_start_date: new Date().toISOString(),
  real_end_date: new Date().toISOString(),
});

export const projectVersionPlaceholder: Pagination<project_version> = {
  data: [
    createProjectVersion("1", 1),
    createProjectVersion("2", 2),
    createProjectVersion("3", 3),
    createProjectVersion("4", 4),
    createProjectVersion("5", 5),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
