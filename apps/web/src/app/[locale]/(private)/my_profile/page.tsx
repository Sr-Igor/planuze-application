"use client";

import { useUserAuth } from "@repo/redux/hooks";

import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  const { user } = useUserAuth();

  return (
    <ShowTemplate
      useTabs={useTabs}
      path="my_profile"
      id={user?.id}
      defaultTab="data"
      undeletableProps={() => ({ title: "" })}
    />
  );
}
