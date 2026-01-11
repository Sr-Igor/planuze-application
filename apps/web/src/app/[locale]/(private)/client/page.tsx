"use client";

import { client } from "@repo/api/generator/types";

import { useClient } from "@/api/callers/client";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<client>
      path="client"
      redirect="show"
      hookReq={useClient}
      useTable={useTable}
      useActions={useActions}
    />
  );
}
