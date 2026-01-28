import { useSearchParams } from "next/navigation";

import { useModal } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { useRouter } from "@repo/language/navigation";
import { useAppDispatch, useAppSelector } from "@repo/redux/hooks";
import { set } from "@repo/redux/store/modules/module/actions";
import { create } from "@repo/redux/store/modules/user/actions";
import { user } from "@repo/types";

export const useUserSet = (redirect: string | null = "/dashboard", skipSet: boolean = false) => {
  const route = useRouter();
  const t = useLang();
  const { all } = useAppSelector((state) => state.module);
  const callback = useSearchParams().get("callbackUrl");
  const moduleId = useSearchParams().get("moduleId");
  const profileId = useSearchParams().get("profileId");

  const dispatch = useAppDispatch();

  const { setModal } = useModal();

  const profileFind = (user: user) => {
    const activeProfiles = user.profiles?.filter((p: any) => p.active) || [];

    if (profileId) {
      const profile = activeProfiles.find((p: any) => p.id === profileId);
      if (profile)
        return {
          id: activeProfiles?.[0].id,
          default: false,
          activeProfiles,
        };
    }

    const defaultProfile = activeProfiles.find((p: any) => p.id === user.default_profile_id);
    if (defaultProfile)
      return {
        id: activeProfiles?.[0].id,
        default: true,
        activeProfiles,
      };

    return {
      id: activeProfiles?.[0].id,
      default: false,
      activeProfiles,
    };
  };

  const moduleFind = () => {
    let moduleItem = all.find((m) => m.title === "personal");

    if (moduleId) {
      moduleItem = all.find((m) => m.id === moduleId);
    }

    return moduleItem;
  };

  const setter = (user: user) => {
    try {
      if (!user?.user_tokens?.[0].token)
        return route.push(`/auth/error?error=${t.error("error_token")}`);

      const profileInfo = profileFind(user);
      const moduleInfo = moduleFind();

      !skipSet && dispatch(set({ profileId: profileInfo.id, moduleId: moduleInfo?.id || "" }));
      dispatch(create(user));
      const hasTwoAuth = user?.user_two_auths?.find((t) => t.confirmed && t.active);

      if (hasTwoAuth) {
        route.push("/config/two_auth");
        return;
      }

      if (!skipSet && profileInfo.activeProfiles?.length > 1 && !profileInfo.default) {
        setModal({ profile: true });
      }

      const path = callback || redirect;
      if (path) route.push(`/${path}`);
    } catch (error) {
      console.error(error);
      route.push(`/auth/error?error=${t.error("error_register")}`);
    }
  };

  return { setter };
};
