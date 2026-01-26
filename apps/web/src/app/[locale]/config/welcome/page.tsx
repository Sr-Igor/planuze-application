"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { differenceInDays } from "date-fns";

import { useClean } from "@repo/cookies";
import { useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hook";
import { CenterTemplate } from "@repo/templates";
import { Button, Skeleton } from "@repo/ui";

import { AppTabs } from "@/components/app-tabs";

import { Invite } from "./options/invite";
import { Registry } from "./options/registry";
import { useReq } from "./use-req";

export default function Page() {
  const [currentTab, setCurrentTab] = useState<string>("invite");
  const user = useAppSelector((state) => state.user);
  const route = useRouter();
  const { clean } = useClean();

  const t = useLang();

  const { me, feedback, store } = useReq();

  const isLoading = me.isLoading || feedback.isPending || store.isPending;

  const invites =
    me.data?.data?.filter((i) =>
      i.accepted === null && i.expire_date
        ? differenceInDays(new Date(i.expire_date), new Date()) >= 0
        : true
    ) || [];

  const tabs = [
    {
      title: t.page.welcome("invites"),
      value: "invite",
      loading: isLoading,
      count: invites.length,
      children: <Invite invites={invites} onFeedback={feedback.mutate} loading={isLoading} />,
    },
    {
      title: t.page.welcome("register"),
      value: "register",
      loading: isLoading,
      children: <Registry onStore={store.mutate} loading={isLoading} />,
    },
  ];

  useEffect(() => {
    if (!me.isLoading && invites.length === 0 && currentTab === "invite") {
      setCurrentTab("register");
    }
  }, [invites, me.isLoading]);

  return (
    <CenterTemplate>
      <div className="flex h-full w-full flex-col items-center justify-center px-10">
        <div className="justify-top relative flex min-h-[580px] w-full flex-col items-center gap-4">
          {me.isLoading && <Skeleton className="absolute h-full w-full" />}

          {!me.isLoading && (
            <>
              <AppTabs
                headerClassName="min-w-max"
                value={currentTab}
                onChange={setCurrentTab}
                tabs={invites.length > 0 ? tabs : tabs.slice(1)}
                className="w-full"
              />
            </>
          )}
        </div>
        <span className="flex w-full flex-col gap-2 md:flex-row">
          {!!user?.profiles?.length && (
            <Button
              variant="outline"
              className="mt-5 w-full flex-1 md:w-[200px]"
              onClick={() => route.back()}
            >
              {t.helper("back")}
            </Button>
          )}
          <Button
            variant="destructive"
            className="mt-5 w-full flex-1 md:w-[200px]"
            onClick={() => clean()}
            disabled={isLoading}
          >
            {t.helper("exit")}
          </Button>
        </span>
      </div>
    </CenterTemplate>
  );
}
