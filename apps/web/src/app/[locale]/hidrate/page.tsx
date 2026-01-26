"use client";

//React && Hooks
import { useEffect, useMemo } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@repo/api/web";
import { useModal } from "@repo/hooks";
import { useAppDispatch, useAuth as userAuth } from "@repo/redux/hook";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import { create } from "@repo/redux/store/modules/user/actions";

import { LoaderTemplate } from "@/templates/loader";

export default function HidratePage() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const callback = useSearchParams().get("callbackUrl");
  const moduleId = useSearchParams().get("moduleId");
  const profileId = useSearchParams().get("profileId");
  const openProfileModal = useSearchParams().get("openProfileModal");

  const { profile } = userAuth();

  const { setModal } = useModal();

  const inConfig = useMemo(() => {
    return !!profile?.company?.in_config;
  }, [profile]);

  const { hidrate } = useAuth({ enableHydrate: true });
  const user = hidrate?.data;
  const activeProfiles = user?.profiles?.filter((p: any) => p.active) || [];

  useEffect(() => {
    if (moduleId && profileId) dispatch(setModule({ profileId, moduleId }));
  }, [moduleId, profileId]);

  useEffect(() => {
    if (user) dispatch(create(user));
  }, [hidrate.data]);

  useEffect(() => {
    if (openProfileModal && activeProfiles?.length > 1) setModal({ profile: true });
  }, [openProfileModal, activeProfiles]);

  useEffect(() => {
    if (!inConfig && user) route.replace(callback || "/dashboard");
  }, [inConfig, user]);

  return <LoaderTemplate inConfig={inConfig} />;
}
