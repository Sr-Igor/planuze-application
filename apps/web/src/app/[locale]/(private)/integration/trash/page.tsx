"use client";

import { useIntegration } from "@repo/api/web";

import { TrashTemplate } from "@/templates/list/trash";

import { useTable } from "./use-table";

export default function Page() {
  //Render
  return <TrashTemplate path="integration" hookReq={useIntegration} useTable={useTable} />;
}
