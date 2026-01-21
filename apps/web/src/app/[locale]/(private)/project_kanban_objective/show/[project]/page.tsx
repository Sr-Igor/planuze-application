"use client";

import { useParams } from "next/navigation";

import { useProjectKanbanObjective } from "@repo/api/web";

import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  const { project } = useParams();

  return (
    <ShowTemplate
      useTabs={useTabs}
      path="project_kanban_objective"
      hookReq={useProjectKanbanObjective}
      defaultTab="data"
      baseUrl={`/project_kanban_objective/index/${project}`}
    />
  );
}
