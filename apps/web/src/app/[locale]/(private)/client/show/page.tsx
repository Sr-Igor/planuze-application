"use client";

import { useClient } from "@repo/api/web";

import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  return (
    <ShowTemplate
      useTabs={useTabs}
      path="client"
      hookReq={useClient}
      defaultTab="data"
      baseUrl="/client"
    />
  );
}
