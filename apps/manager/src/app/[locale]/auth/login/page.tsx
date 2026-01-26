"use client";

import { CenterTemplate } from "@repo/templates";

import { AuthLogic } from "./logic";

export default function Page() {
  return (
    <CenterTemplate>
      <div className="gap- flex w-full max-w-[320px] flex-col items-center">
        <AuthLogic />
      </div>
    </CenterTemplate>
  );
}
