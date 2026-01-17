"use client";

import { invite } from "@repo/types";

import { useInvite } from "@repo/api/web/callers/invite";
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
