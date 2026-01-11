"use client";

import { kanban_template_card_type } from "@repo/api/generator/types";

import { useKanbanTemplateCardType } from "@/api/callers/kanban_template_card_type";
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
