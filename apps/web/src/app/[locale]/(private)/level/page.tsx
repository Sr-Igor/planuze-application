"use client";

import { level } from "@repo/types";

import { useLevel } from "@repo/api/web/callers/level";
import { useAuth } from "@repo/redux/hook";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const { profile } = useAuth();
  return (
    <BaseTemplate<level>
      path="level"
      redirect="show"
      hookReq={useLevel}
      useTable={(props) => useTable({ ...props, profile })}
      useActions={useActions}
    />
  );
}
