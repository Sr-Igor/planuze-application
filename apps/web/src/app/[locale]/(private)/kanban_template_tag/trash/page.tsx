"use client";

import { useKanbanTemplateTag } from "@repo/api/web";

import { TrashTemplate } from "@/templates/list/trash";

import { useTable } from "./use-table";

export default function Page() {
  //Render
  return (
    <TrashTemplate path="kanban_template_tag" hookReq={useKanbanTemplateTag} useTable={useTable} />
  );
}
