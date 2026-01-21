"use client";

import { useRole } from "@repo/api/web";
import { role } from "@repo/types";

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
