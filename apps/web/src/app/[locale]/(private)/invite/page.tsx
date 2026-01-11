"use client";

import { invite } from "@repo/api/generator/types";

import { useInvite } from "@/api/callers/invite";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useForm, useTable } from "./hooks";

export default function Page() {
  return (
    <BaseTemplate<invite>
      path="invite"
      hookReq={useInvite}
      useTable={useTable}
      useActions={useActions}
      useForm={useForm}
    />
  );
}
