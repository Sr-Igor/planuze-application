import { useRouter } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hooks";
import {
  AppProfileSelect,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  useIsMobile,
} from "@repo/ui";

import { useAccess } from "@/hooks/access";

export interface ProfileSwitcherProps {
  callbackUrl?: string;
}

export const ProfileSwitcher = ({ callbackUrl }: ProfileSwitcherProps) => {
  const t = useLang();
  const { user, profile: currentProfile } = useAccess();
  const { all } = useAppSelector((state) => state.module);
  const isMobile = useIsMobile();
  const route = useRouter();

  const handleProfileChange = (profileId: string) => {
    const personalModule = all.find((m) => m.title === "personal");
    route.push(
      `/hidrate?profileId=${profileId}&moduleId=${personalModule?.id}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ""}`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{t.helper("change_profile")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          {user?.profiles?.map((p) => (
            <AppProfileSelect
              key={p.id}
              profile={p}
              isCurrentProfile={p.id === currentProfile?.id}
              onSelect={() => handleProfileChange(p.id)}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
