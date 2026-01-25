import { BadgeCheck, ShieldBan } from "lucide-react";

import { profile } from "@repo/types";

import { cn } from "../../../shared/utils";
import { DropdownMenuItem } from "../../primitives/dropdown-menu";
import { AppAvatar } from "../app-avatar";

export interface AppProfileSelectProps {
  profile: profile;
  isCurrentProfile: boolean;
  onSelect: () => void;
}

export const AppProfileSelect = ({
  profile,
  isCurrentProfile,
  onSelect,
}: AppProfileSelectProps) => {
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
