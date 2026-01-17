"use client";

import { integration } from "@repo/types";

import { useIntegration } from "@repo/api/web/callers/integration";
import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  return (
    <ShowTemplate<integration>
      useTabs={useTabs}
      path="integration"
      hookReq={useIntegration}
      defaultTab="data"
      baseUrl="/integration"
    />
  );
}
