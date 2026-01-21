/**
 * Project config placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_config } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectConfig = (id: string): project_config => ({
  id,
  util_hour_day: 1,
  total_hour_day: 1,
  project_version_id: id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  deletedAt: null,
  project_id: id,
  company_id: id,
});

export const projectConfigPlaceholder: Pagination<project_config> = {
  data: [
    createProjectConfig("1"),
    createProjectConfig("2"),
    createProjectConfig("3"),
    createProjectConfig("4"),
    createProjectConfig("5"),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
