"use client";

import { useParams } from "next/navigation";

import { useProjectKanbanObjective } from "@repo/api/web";
import { useLang } from "@repo/language/hooks";
import { project_kanban_objective } from "@repo/types";
import { Icon } from "@repo/ui";

import { BaseTemplate } from "@/templates/list/base";
import { usePrivateContext } from "@/templates/private/context";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const { slug } = useParams();
  const { feature } = usePrivateContext();

  const splitSlug = slug?.toString().split("-");
  const projectKanbanId = splitSlug?.[0];
  const projectName = decodeURIComponent(splitSlug?.[2] || "");

  //Translations
  const t = useLang();
  const pageT = t.page["project_kanban_objective"];

  return (
    <BaseTemplate<project_kanban_objective>
      path="project_kanban_objective"
      redirect={`/project_kanban_objective/show/${slug}`}
      hookReq={useProjectKanbanObjective}
      useTable={useTable}
      useActions={useActions}
      trashUrl={`/project_kanban_objective/trash/${slug}`}
      titlePage={
        <h1 className="mb-5 flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
          <Icon name={feature?.icon} className="hidden h-5 w-5 md:block" />
          <span className="line-clamp-1 flex-1 truncate">
            {pageT("title")} {projectName ? `${t.helper("of")} ${projectName}` : ""}
          </span>
        </h1>
      }
      customFilters={{
        project_kanban_id: projectKanbanId,
      }}
    />
  );
}
