"use client";

import { useKanbanTemplateTag } from "@repo/api/web";
import { kanban_template_tag } from "@repo/types";

import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<kanban_template_tag>
      path="kanban_template_tag"
      hookReq={useKanbanTemplateTag}
      useTable={useTable}
      useActions={useActions}
      useForm={useForm}
      showLogs
    />
  );
}
