"use client";

import { project } from "@repo/types";

import { useProject } from "@repo/api/web/callers/project";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<project>
      path="project"
      hookReq={useProject}
      useTable={useTable}
      useActions={useActions}
      redirect="show"
      showLogs
    />
  );
}
