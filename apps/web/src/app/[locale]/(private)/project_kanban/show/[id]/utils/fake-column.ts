import { project_kanban_cycle_column } from "@repo/api/generator/types";

export const fakeColumn: project_kanban_cycle_column = {
  id: "principal-tasks",
  title: "Principal Tasks",
  color: "#000000",
  limit: 0,
  project_kanban_cycle_cards: [],
  deleted: false,
  deletedAt: null,
  company_id: "1",
  project_kanban_cycle_id: "1",
  order: 1,
  createdAt: new Date()?.toISOString(),
  updatedAt: new Date()?.toISOString(),
  description: null,
  finished: false,
  project_kanban_id: "1",
  project_id: "1",
};
