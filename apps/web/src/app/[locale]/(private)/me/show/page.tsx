"use client";

import { useMe } from "@repo/api/web";
import { useUserAuth } from "@repo/redux/hooks";

import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  const { profile } = useUserAuth();

  return (
    <ShowTemplate
      useTabs={useTabs}
      path="me"
      id={profile?.id}
      hookReq={useMe}
      defaultTab="data"
      baseUrl="/me"
      undeletableProps={() => {
        return { title: "" };
      }}
    />
  );
}
