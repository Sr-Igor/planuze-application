import { useSearchParams } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import { useRouter } from "@repo/language/navigation";
import { useAppDispatch, useAppSelector } from "@repo/redux/hook";
import { set } from "@repo/redux/store/modules/module/actions";
import { create } from "@repo/redux/store/modules/user/actions";
import { user } from "@repo/types";

import { useModal } from "../modal";

export const useUserSet = (redirect: string | null = "/dashboard", initialMode: boolean = true) => {
  const route = useRouter();
  const t = useLang();
  const { all } = useAppSelector((state) => state.module);
  const callback = useSearchParams().get("callbackUrl");

  const dispatch = useAppDispatch();

  const { setModal } = useModal();

  const setter = (user: user) => {
    try {
      if (!user?.user_tokens?.[0].token)
        return route.push(`/auth/error?error=${t.error("error_token")}`);

      const activeProfiles = user.profiles?.filter((p: any) => p.active) || [];
      const personalModule = all.find((m) => m.title === "personal");
      const defaultProfile = activeProfiles.find((p: any) => p.id === user.default_profile_id);

      if (initialMode) {
        const activeProfile = activeProfiles?.[0];
        if (defaultProfile) {
          dispatch(set({ profileId: defaultProfile?.id, moduleId: personalModule?.id || "" }));
        } else {
          dispatch(set({ profileId: activeProfile?.id, moduleId: personalModule?.id || "" }));
        }
      }
      dispatch(create(user));
      const hasTwoAuth = user?.user_two_auths?.find((t) => t.confirmed && t.active);

      if (hasTwoAuth) {
        route.push("/config/two_auth");
        return;
      }

      if (initialMode && activeProfiles?.length > 1 && !defaultProfile) {
        setModal({ profile: true });
      }

      if (callback || redirect) route.push(callback || redirect!);
    } catch (error) {
      route.push(`/auth/error?error=${t.error("error_register")}`);
    }
  };

  return { setter };
};
