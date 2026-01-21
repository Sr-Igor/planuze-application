"use client";

import { useKanbanTemplateCardType } from "@repo/api/web";
import { kanban_template_card_type } from "@repo/types";

import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<kanban_template_card_type>
      path="kanban_template_card_type"
      hookReq={useKanbanTemplateCardType}
      useTable={useTable}
      useActions={useActions}
      useForm={useForm}
      showLogs
    />
  );
}
