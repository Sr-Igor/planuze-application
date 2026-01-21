"use client";

import { useKanbanTemplate } from "@repo/api/web";

import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  return (
    <ShowTemplate
      useTabs={useTabs}
      path="kanban_template"
      hookReq={useKanbanTemplate}
      defaultTab="data"
      baseUrl="/kanban_template"
    />
  );
}
