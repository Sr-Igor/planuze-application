"use client";

import { useInvite } from "@repo/api/web";

import { TrashTemplate } from "@/templates/list/trash";

import { useTable } from "./use-table";

export default function Page() {
  //Render
  return <TrashTemplate path="invite" hookReq={useInvite} useTable={useTable} />;
}
