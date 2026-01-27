"use client";

import { CenterTemplate } from "@repo/templates";

import { AuthLogic } from "./logic";

export default function Page() {
  return (
    <CenterTemplate containerClassName="mt-10">
      <AuthLogic />
    </CenterTemplate>
  );
}
