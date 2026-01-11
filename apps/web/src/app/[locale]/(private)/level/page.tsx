"use client";

import { level } from "@repo/api/generator/types";

import { useLevel } from "@/api/callers/level";
import { useAuth } from "@/hooks/auth";
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
