"use client";

import { useParams } from "next/navigation";

import { useProjectKanbanObjective } from "@repo/api/web";
import { useLang } from "@repo/language/hooks";
import { Icon } from "@repo/ui";

import { TrashTemplate } from "@/templates/list/trash";
import { usePrivateContext } from "@/templates/private/context";

import { useTable } from "./use-table";

export default function Page() {
  const { slug } = useParams();
  const { feature } = usePrivateContext();

  const splitSlug = slug?.toString().split("-");
  const projectName = decodeURIComponent(splitSlug?.[2] || "");

  //Translations
  const t = useLang();
  const pageT = t.page["project_kanban_objective"];

  //Render
  return (
    <TrashTemplate
      path="project_kanban_objective"
      hookReq={useProjectKanbanObjective}
      useTable={useTable}
      titlePage={
        <h1 className="mb-5 flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
          <Icon name={feature?.icon} className="hidden h-5 w-5 md:block" />
          <span className="text-red-500 uppercase">[{t.helper("trash")}]</span>
          <span className="line-clamp-1 flex-1 truncate">
            {pageT("title")} {projectName ? `${t.helper("of")} ${projectName}` : ""}
          </span>
        </h1>
      }
    />
  );
}
