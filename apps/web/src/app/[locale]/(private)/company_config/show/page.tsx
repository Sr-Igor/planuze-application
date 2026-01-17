"use client";

import { company_config } from "@repo/types";

import { useCompanyConfig } from "@repo/api/web/callers/company_config";
import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  return (
    <ShowTemplate<company_config>
      useTabs={useTabs}
      path="company_config"
      id={"company_config"}
      hookReq={useCompanyConfig}
      defaultTab="general"
      undeletableProps={() => ({ title: "" })}
    />
  );
}
