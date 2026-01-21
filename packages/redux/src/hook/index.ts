//Redux
//Types
import { useMemo } from "react";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { getModule, getProfile, getTwoAuth } from "@repo/cookies";
import { subscription } from "@repo/types";

import type { AppDispatch, RootState } from "../store/index";

export type { AppDispatch, RootState } from "../store/index";
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector as TypedUseSelectorHook<RootState>;

export const useAuth = () => {
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
  };
};
