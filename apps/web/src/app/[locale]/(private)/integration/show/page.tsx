"use client";

import { useIntegration } from "@repo/api/web";
import { integration } from "@repo/types";

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
