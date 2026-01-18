import { BadgeCheck, ShieldBan } from "lucide-react";

import { profile } from "@repo/types";
import { DropdownMenuItem , cn , AppAvatar } from "@repo/ui-new";



interface ProfileSelectItemProps {
  profile: profile;
  isCurrentProfile: boolean;
  onSelect: () => void;
}

export const ProfileSelectItem = ({
  profile,
  isCurrentProfile,
  onSelect,
}: ProfileSelectItemProps) => {
  return (
    <DropdownMenuItem
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between gap-2",
        isCurrentProfile && "bg-muted text-foreground"
      )}
    >
      <span className="flex items-center gap-2 text-xs font-medium">
        <AppAvatar
          src={profile?.company?.logo || ""}
          path="company/logo"
          name={profile?.company?.name || ""}
          className="h-5 w-5"
          publicFile
        />

        {profile?.company?.name}
      </span>
      {profile.active ? (
        <BadgeCheck
          className={cn("size-4", isCurrentProfile ? "text-green-500" : "text-gray-400")}
        />
      ) : (
        <ShieldBan className="size-4 text-red-500" />
      )}
    </DropdownMenuItem>
  );
};
