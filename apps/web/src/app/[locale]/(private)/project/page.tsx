"use client";

import { useProject } from "@repo/api/web";
import { project } from "@repo/types";

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
