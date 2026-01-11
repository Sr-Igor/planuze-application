"use client";

import { integration } from "@repo/api/generator/types";

import { useIntegration } from "@/api/callers/integration";
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
