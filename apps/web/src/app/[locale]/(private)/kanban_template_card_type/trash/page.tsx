"use client";

import { useKanbanTemplateCardType } from "@repo/api/web";

import { TrashTemplate } from "@/templates/list/trash";

import { useTable } from "./use-table";

export default function Page() {
  //Render
  return (
    <TrashTemplate
      path="kanban_template_card_type"
      hookReq={useKanbanTemplateCardType}
      useTable={useTable}
    />
  );
}
