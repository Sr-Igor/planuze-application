"use client";

import { useCostCenter } from "@repo/api/web";
import { cost_center } from "@repo/types";

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
