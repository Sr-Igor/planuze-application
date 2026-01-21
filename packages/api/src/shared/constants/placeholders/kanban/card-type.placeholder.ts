/**
 * Project kanban cycle card type placeholder data
 * Used for initial data loading and skeleton states
 */
import type { project_kanban_cycle_card_type } from "@repo/types";

import type { Pagination } from "../../../../core/domain/entities/pagination.entity";

const createCardType = (
  id: string,
  title: string,
  icon: string,
  color: string,
  principal: boolean
): project_kanban_cycle_card_type => ({
  id,
  title,
  icon,
  color,
  principal,
  deleted: false,
  project_kanban_cycle_id: "1",
  company_id: "1",
  problem: false,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  deletedAt: null,
  project_kanban_id: "1",
  project_id: "1",
  kanban_template_card_type_id: "1",
});

export const projectKanbanCycleCardTypePlaceholder: Pagination<project_kanban_cycle_card_type> = {
  data: [
    createCardType("1", "Backlog", "backlog", "#3B82F6", true),
    createCardType("2", "To Do", "todo", "#F59E0B", false),
    createCardType("3", "In Progress", "inprogress", "#F59E0B", false),
    createCardType("4", "Done", "done", "#F59E0B", false),
    createCardType("5", "Review", "review", "#F59E0B", false),
    createCardType("6", "Done", "done", "#F59E0B", false),
    createCardType("7", "Review", "review", "#F59E0B", false),
    createCardType("8", "Done", "done", "#F59E0B", false),
    createCardType("9", "Done", "done", "#F59E0B", false),
    createCardType("10", "Done", "done", "#F59E0B", false),
  ],
  page: 1,
  pages: 1,
  count: 0,
};
