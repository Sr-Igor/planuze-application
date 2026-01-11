"use client";

//React && Hooks
import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useLang } from "@repo/language/hook";

import { useModal } from "@/hooks/modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { set } from "@/store/modules/module/actions";
import { create } from "@/store/modules/user/actions";
import { LoaderTemplate } from "@/templates/loader";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const callback = useSearchParams().get("callbackUrl");
  const { all } = useAppSelector((state) => state.module);

  const t = useLang();

  const { setModal } = useModal();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL!, {
        credentials: "include",
      });

      const data = await res.json();
      const user = data.data;
      if (!user) route.push(`/auth/error?error=${t.error("error_user_not_found")}`);

      try {
        if (!user.user_tokens[0].token)
          return route.push(`/auth/error?error=${t.error("error_token")}`);

        const personalModule = all.find((m) => m.title === "personal");
        const activeProfiles = user?.profiles?.filter((p: any) => p.active) || [];
        const activeProfile = activeProfiles?.[0];
        dispatch(set({ profileId: activeProfile?.id, moduleId: personalModule?.id || "" }));
        dispatch(create(user));

        const hasTwoAuth = user?.user_two_auths?.find((t: any) => t.confirmed && t.active);

        if (hasTwoAuth) {
          route.push("/config/two_auth");
          return;
        }

        activeProfiles.length > 1 && setModal({ profile: true });

        route.push(callback || "/dashboard");
      } catch (error) {
        route.push(`/auth/error?error=${t.error("error_register")}`);
      }
    } catch (error) {
      route.push(`/auth/error?error=${t.error("error_register")}`);
    }
  };

  return <LoaderTemplate />;
}
