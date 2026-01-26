"use client";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { getProfile } from "@repo/cookies";
import { useIntlFormat, useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hooks";
import { AppAvatar, Button, cn, StatusCircle } from "@repo/ui";

export const Company = () => {
  const t = useLang();
  const { dates } = useIntlFormat();
  const user = useAppSelector((state) => state.user);
  const profileIdCookie = getProfile();
  const { profileId: profileIdStore, all } = useAppSelector((state) => state.module);
  const route = useRouter();
  const profileId = profileIdCookie || profileIdStore;

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            route.push("/config/welcome");
          }}
        >
          <Plus className="h-4 w-4" />
          {t.page.my_profile("show.company.add")}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {user?.profiles?.map((profile) => (
          <button
            key={profile.id}
            className={cn(
              "bg-muted hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-colors",
              profileId === profile.id && "border-green-500"
            )}
            onClick={() => {
              if (profileId === profile.id) return;
              const personalModule = all.find((m) => m.title === "personal");
              route.push(`/hidrate?profileId=${profile.id}&moduleId=${personalModule?.id}`);
            }}
          >
            <AppAvatar
              src={profile?.company?.logo || ""}
              path="company/logo"
              name={profile?.company?.name || ""}
              className="h-25 w-25"
              fallbackClassName="text-5xl"
              publicFile
            />
            <span className="flex items-center gap-2">
              <p className="text-md font-medium">{profile.company?.name}</p>
              <StatusCircle status={profile.active} className="h-4 w-4" />
            </span>
            <p className="text-muted-foreground text-sm">
              {t.page.my_profile("show.company.level")}:{" "}
              {profile.level?.title || t.page.my_profile("show.company.undefined")}
            </p>
            {profile.createdAt && (
              <p className="text-muted-foreground text-sm">
                {t.page.my_profile("show.company.registered_at")}:{" "}
                {dates.format(new Date(profile.createdAt))}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
