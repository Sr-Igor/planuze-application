"use client";

import { CenterTemplate } from "@repo/templates";

import { AuthLogic } from "./logic";

export default function Page() {
  return (
    <CenterTemplate>
      <AuthLogic />
    </CenterTemplate>
  );
}
