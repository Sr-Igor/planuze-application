"use client";

import { useState } from "react";

import { plan } from "@/api/generator/types";
import { useAuth } from "@/hooks/auth";
import { useIntlFormat } from "@/hooks/intl-format";

import { IPlanTemplateProps } from "../types";
import { useUtilsPlan } from "./use-utils-plan";

export const usePage = ({ subscriptions, plans, isLoading }: IPlanTemplateProps) => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { dates } = useIntlFormat();
  const { user } = useAuth();

  const { filterPlansByBilling } = useUtilsPlan();

  // Derived data for subscriptions
  const currentSubscription = subscriptions?.[0];

  // Derived data for plans
  const isSubscribed = currentSubscription && currentSubscription?.status !== "deleted";

  const monthlyPlans = filterPlansByBilling(plans, "monthly");
  const yearlyPlans = filterPlansByBilling(plans, "yearly");

  const currentPlanObj = plans?.find((p: any) => p.id === currentSubscription?.plan_id);
  const endDateFormatted = currentSubscription?.end_date
    ? dates.formatDate(new Date(currentSubscription.end_date))
    : null;

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [planToChange, setPlanToChange] = useState<plan | null>(null);

  const handleOpenChangePlanModal = (plan: any) => {
    setPlanToChange(plan);
    setIsChangeModalOpen(true);
  };

  const isCurrentPlan = (plan: any) => {
    return isSubscribed && plan?.id === currentSubscription?.plan_id;
  };

  return {
    isLoading,
    monthlyPlans,
    yearlyPlans,
    isSubscribed,
    isCurrentPlan,
    activeTab,
    setActiveTab,
    handleOpenChangePlanModal,
    isChangeModalOpen,
    setIsChangeModalOpen,
    planToChange,
    currentPlanObj,
    endDateFormatted,
    currentSubscription,
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
  };
};
