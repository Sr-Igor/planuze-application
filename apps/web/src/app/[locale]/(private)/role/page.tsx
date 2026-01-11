"use client";

import { role } from "@repo/api/generator/types";

import { useRole } from "@/api/callers/role";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  return (
    <>
      <BaseTemplate<role>
        path="role"
        hookReq={useRole}
        useTable={useTable}
        useActions={useActions}
        useForm={useForm}
        showLogs
      />
    </>
  );
}
