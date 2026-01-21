"use client";

import { useWorkType } from "@repo/api/web";

import { TrashTemplate } from "@/templates/list/trash";

import { useTable } from "./use-table";

export default function Page() {
  //Render
  return <TrashTemplate path="work_type" hookReq={useWorkType} useTable={useTable} />;
}
