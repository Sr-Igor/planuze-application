"use client";

import { useIntegration } from "@repo/api/web";
import { integration } from "@repo/types";

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
