"use client";

import { useLevel } from "@repo/api/web";
import { useUserAuth } from "@repo/redux/hooks";
import { level } from "@repo/types";

import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const { profile } = useUserAuth();
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
