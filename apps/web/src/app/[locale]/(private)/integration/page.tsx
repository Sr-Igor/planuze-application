"use client";

import { integration } from "@repo/types";

import { useIntegration } from "@repo/api/web/callers/integration";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<integration>
      path="integration"
      redirect="show"
      hookReq={useIntegration}
      useTable={useTable}
      useActions={useActions}
    />
  );
}
