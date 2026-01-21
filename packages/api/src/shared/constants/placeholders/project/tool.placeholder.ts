/**
 * Project tool placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_tool } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectTool = (id: string, num: number): project_tool => ({
  id,
  company_id: id,
  currency: "BRL",
  value: num,
  title: "1",
  description: "1",
  consumption: "daily",
  type: "1",
  recurrence: "monthly",
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  project_version_id: id,
  project_id: id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  deletedAt: null,
});

export const projectToolPlaceholder: Pagination<project_tool> = {
  data: [
    createProjectTool("1", 1),
    createProjectTool("2", 2),
    createProjectTool("3", 3),
    createProjectTool("4", 4),
    createProjectTool("5", 5),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
