/**
 * Project member placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_member } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createProjectMember = (id: string): project_member => ({
  profile_id: id,
  id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deleted: false,
  deletedAt: null,
  project_id: id,
  company_id: id,
});

export const projectMemberPlaceholder: Pagination<project_member> = {
  data: [
    createProjectMember("1"),
    createProjectMember("2"),
    createProjectMember("3"),
    createProjectMember("4"),
    createProjectMember("5"),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
