"use client";

import { integration } from "@repo/api/generator/types";

import { useIntegration } from "@/api/callers/integration";
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
