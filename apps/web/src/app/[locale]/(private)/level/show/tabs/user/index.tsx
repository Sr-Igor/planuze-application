import { useEffect, useState } from "react";

import { PackageOpen, UserPlus } from "lucide-react";

import { level, profile } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useProfile } from "@repo/api/web/callers/profile";
import { Permission } from "@/components/ui/permission";
import { useShow } from "@/templates/show/context";

import { Profile } from "./card";
import { ModalForm } from "./modal";

export const User = () => {
  const t = useLang();
  const [open, setOpen] = useState(false);

  const { data } = useShow<level>();

  const [internalProfiles, setInternalProfiles] = useState<profile[]>(data?.profiles || []);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    setInternalProfiles(data?.profiles || []);
  }, [data?.profiles]);

  const { update } = useProfile({
    id: profileId,
    callbacks: {
      update: {
        onSuccess: (e) => {
          setInternalProfiles((prev) => [e as profile, ...prev]);
          setOpen(false);
        },
      },
    },
  });

  const handleSubmit = (item: { profile_id: string }) => {
    setProfileId(item.profile_id);
    update.mutate({ level_id: data?.id });
  };

  return (
    <>
      <div className="flex h-full flex-col gap-4 px-3 md:px-5">
        <div className="flex justify-end">
          <Permission permission={["update"]} feature="profile">
            <Button onClick={() => setOpen(true)}>
              <UserPlus />
              {t.page.level("show.profile.define_user")}
            </Button>
          </Permission>
        </div>
        <span className="flex flex-col gap-4">
          {internalProfiles?.map((profile, idx) => (
            <Profile profile={profile} key={`${profile.id}.${idx}`} />
          ))}
        </span>
        {!internalProfiles?.length && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
            <PackageOpen size={60} className="text-muted-foreground" />
            <p className="text-muted-foreground text-center text-sm font-semibold md:text-base">
              {t.page.level("show.profile.empty")}
            </p>
          </div>
        )}
      </div>

      <ModalForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        profiles={internalProfiles || []}
        loading={update.isPending}
      />
    </>
  );
};
