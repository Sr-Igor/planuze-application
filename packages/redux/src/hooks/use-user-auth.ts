import { useMemo } from "react";

import { addDays, differenceInDays, isAfter, isBefore } from "date-fns";

import { getModule, getProfile, getTwoAuth } from "@repo/cookies";
import { subscription } from "@repo/types";

import type { Warning } from "./types";
import { useAppSelector } from "./use-actions";

export const useUserAuth = () => {
  // Usando selectors separados para evitar criar objetos novos
  const user = useAppSelector((state) => state.user);
  const moduleState = useAppSelector((state) => state.module);

  const profileIdCookie = getProfile();
  const moduleIdCookie = getModule();

  const {
    all: allModules,
    moduleId: moduleIdStore,
    profileId: profileIdStore,
    actions,
  } = moduleState;

  const profileId = profileIdCookie || profileIdStore;
  const moduleId = moduleIdCookie || moduleIdStore;

  const profile = useMemo(
    () => user?.profiles?.find((p) => p.id === profileId),
    [user?.profiles, profileId]
  );
  const subscription = profile?.company?.subscriptions?.[0] as subscription;
  const module = useMemo(() => allModules.find((m) => m.id === moduleId), [allModules, moduleId]);
  const hasLevel =
    !!user?.id && !!user.confirmed && !!user?.profiles?.find((p) => p.id === profileId)?.level_id;
  const hasProfile =
    !!user?.id && !!user.confirmed && !!user?.profiles?.find((p) => p.id === profileId)?.active;

  const hasTwoAuth =
    !!getTwoAuth() ||
    (!user?.user_two_auths?.find((t) => t.confirmed && t.active) &&
      !window.location.pathname.includes("/config/two_auth"));

  const activeSubscription = subscription && subscription?.status !== "deleted";

  const enabledPrivateRoutes = useMemo(() => {
    return hasLevel && activeSubscription;
  }, [hasLevel, activeSubscription]);

  const warning: Warning | undefined = useMemo(() => {
    const subscription = profile?.company?.subscriptions?.[0];

    const endDate = new Date(subscription?.end_date ?? "");
    const today = new Date();

    if (subscription?.status === "deleted") {
      return {
        type: "error",
        title: () => ({ message: "subscription_canceled.title" }),
        description: () => ({ message: "subscription_canceled.description" }),
        locked: true,
      };
    } else if (subscription?.is_test) {
      if (isAfter(today, endDate)) {
        return {
          type: "error",
          title: () => ({ message: "test_expired.title" }),
          description: () => ({ message: "test_expired.description" }),
          locked: true,
        };
      } else if (isBefore(today, endDate)) {
        const daysLeft = differenceInDays(endDate, today);
        const MIN_DAYS_TO_RENEW = 3;

        if (daysLeft <= MIN_DAYS_TO_RENEW) {
          return {
            type: "info",
            title: () => ({ message: "test_ending.title" }),
            description: () => ({
              message: "test_ending.description",
              params: { days: daysLeft },
            }),
            locked: false,
          };
        }
      }
    } else if (isAfter(today, addDays(endDate, 1))) {
      const daysOff = subscription?.days_off ?? 0;
      const maxDate = addDays(endDate, daysOff);
      const daysLeft = differenceInDays(maxDate, today);

      if (isBefore(today, maxDate)) {
        return {
          type: "warning",
          title: () => ({ message: "subscription_not_renewed.title" }),
          description: () => ({
            message: "subscription_not_renewed.description",
            params: { days: daysLeft },
          }),
          locked: false,
        };
      } else {
        return {
          type: "error",
          title: () => ({ message: "subscription_expired.title" }),
          description: () => ({ message: "subscription_expired.description" }),
          locked: true,
        };
      }
    }
  }, [profile]);

  return {
    user,
    profile,
    subscription,
    module,
    modules: allModules,
    hasTwoAuth,
    actions,
    enabledPrivateRoutes,
    hasLevel,
    hasProfile,
    activeSubscription,
    warning,
  };
};
