"use client";

import { useRouter } from "next/navigation";

import { project_kanban } from "@repo/api/generator/types";

import { useProjectKanban } from "@/api/callers/project_kanban";
import { useAccess } from "@/hooks/access";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  const { permissions } = useAccess();
  const perm = permissions();
  const router = useRouter();

  return (
    <BaseTemplate<project_kanban>
      path="project_kanban"
      hookReq={useProjectKanban}
      useTable={useTable}
      useActions={useActions}
      useForm={useForm}
      showLogs
      events={{
        onRowDoubleClick: (item) => {
          if (!perm.show) return;
          router.push(`/project_kanban/show/${item.id}`);
        },
      }}
    />
  );
}
