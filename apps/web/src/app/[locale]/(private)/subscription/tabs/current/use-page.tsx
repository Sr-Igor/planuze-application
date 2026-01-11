"use client";

import { useMemo } from "react";

import { differenceInDays, isAfter } from "date-fns";

import { useLang } from "@repo/language/hook";

import { useIntlFormat } from "@/hooks/intl-format";

import { ITabProps } from "../types";

export const usePage = ({ subscriptions, plans, isLoading }: ITabProps) => {
  const t = useLang();
  const { dates } = useIntlFormat();
  // Derived data for subscriptions
  const subscription = subscriptions?.[0];
  const plan = subscription?.subscription_plan;

  // Derived data for plans
  const currentPlanId = subscription?.plan_id;
  const currentPlanObj = plans?.find((p: any) => p.id === currentPlanId);

  const daysToChange = subscription?.end_date
    ? differenceInDays(new Date(subscription?.end_date), new Date())
    : 0;

  const isPriceChanged =
    !!currentPlanObj?.price &&
    !!subscription?.subscription_plan?.price &&
    subscription?.subscription_plan?.price !== currentPlanObj?.price &&
    daysToChange < 7;

  //Scheduled Downgrade
  const scheduledDowngrade = useMemo(() => {
    const changes = subscription?.company?.subscription_changes || [];
    if (!changes.length) return null;
    const first = changes[0];

    if (first.change_type === "downgrade" && isAfter(new Date(first.effective_date), new Date())) {
      return {
        from: first.from_plan?.title || "-",
        to: first.to_plan?.title || "-",
        date: first.effective_date,
      };
    }
    return null;
  }, [subscription]);

  //Plans Status
  const statusMap: { [key: string]: { label: string; color: string } } = {
    active: {
      label: t.page.subscription("signature.active"),
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    canceled: {
      label: t.page.subscription("signature.canceled"),
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    deleted: {
      label: t.page.subscription("signature.deleted"),
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    past_due: {
      label: t.page.subscription("signature.past_due"),
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    incomplete: {
      label: t.page.subscription("signature.incomplete"),
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    },
    expired: {
      label: t.page.subscription("signature.expired"),
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
  };

  const now = new Date();
  const endDate = subscription?.end_date ? new Date(subscription.end_date) : null;

  const customDescription = useMemo(() => {
    if (!plan?.price && endDate && endDate > now) {
      return t.page.subscription("expire_in", { date: dates.format(endDate) });
    }
    return null;
  }, [endDate, now]);

  const statusInfo = useMemo(() => {
    let statusInfo = statusMap[subscription?.status] || statusMap.incomplete;
    if (endDate && endDate < now) statusInfo = statusMap.expired;
    if (subscription?.cancel_at_period_end && endDate && endDate < now)
      statusInfo = statusMap.canceled;

    return statusInfo;
  }, [subscription, endDate, now]);

  // Agrupamento
  const allFeatures = plan?.subscription_plan_features || [];
  const groupedFeatures = useMemo(() => {
    const grouped: Record<string, { module: any; features: { title: string }[] }> = {};
    allFeatures.forEach((f: any) => {
      const showPlan = f.feature?.show_plan;
      if (!showPlan) return;

      const module = f.feature?.module;
      if (!module) return;
      if (!grouped[module.id]) {
        grouped[module.id] = {
          module,
          features: [],
        };
      }
      grouped[module.id].features.push({
        title: f.feature?.plan_title || f.feature?.title || "-",
      });
    });
    return Object.values(grouped);
  }, [allFeatures]);

  return {
    isLoading,
    subscription,
    currentPlanObj,
    plan,
    isPriceChanged,
    scheduledDowngrade,
    statusInfo,
    customDescription,
    groupedFeatures,
  };
};
