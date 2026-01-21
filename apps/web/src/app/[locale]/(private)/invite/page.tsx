"use client";

import { useInvite } from "@repo/api/web";
import { invite } from "@repo/types";

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
