"use client";

import { cost_center } from "@repo/api/generator/types";

import { useCostCenter } from "@/api/callers/cost_center";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<cost_center>
      path="cost_center"
      hookReq={useCostCenter}
      useTable={useTable}
      useActions={useActions}
      useForm={useForm}
      showLogs
    />
  );
}
