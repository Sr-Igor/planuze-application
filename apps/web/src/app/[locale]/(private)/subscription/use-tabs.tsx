"use client";

import { usePlan, useSubscription } from "@repo/api/web";
import { useLoading } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";

import { useAccess } from "@/hooks/access";

import { Current, Invoices, Plans } from "./tabs";

export const useTabs = () => {
  const t = useLang();

  const { profile } = useAccess();
  const { index } = useSubscription({ enabledIndex: true });
  const { index: indexPlan } = usePlan({ companyId: profile?.company_id, enabled: true });

  const subscriptions = index?.data?.data || [];
  const plans = indexPlan?.data?.data || [];
  const isLoading = useLoading({ index, indexPlan });

  const props = { subscriptions, isLoading, plans };

  return [
    {
      title: t.page.subscription("tabs.current"),
      value: "current",
      children: <Current {...props} />,
    },
    {
      title: t.page.subscription("tabs.invoice"),
      value: "invoices",
      children: <Invoices {...props} />,
    },
    {
      title: t.page.subscription("tabs.plans"),
      value: "plans",
      children: <Plans {...props} />,
    },
  ];
};
