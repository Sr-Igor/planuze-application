"use client";

import { CenterTemplate } from "@/templates/center";

import { AuthLogic } from "./logic";

export default function Page() {
  return (
    <CenterTemplate>
      <AuthLogic />
    </CenterTemplate>
  );
}
