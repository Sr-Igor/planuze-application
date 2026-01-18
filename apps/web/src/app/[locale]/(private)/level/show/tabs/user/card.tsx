import { profile } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

export interface IProfileFormProps {
  profile: Partial<profile>;
}

export const Profile = ({ profile }: IProfileFormProps) => {
  return (
    <Card className={cn("flex w-full")}>
      <CardContent className="flex w-full p-3 md:p-4">
        <span className="flex flex-1 gap-3">
          <Avatar className="h-8 w-8 rounded-lg md:h-10 md:w-10">
            {profile?.user?.avatar && (
              <AvatarImage
                src={profile?.user?.avatar}
                alt={profile?.user?.name || profile?.anonymous_name || "-"}
              />
            )}
            <AvatarFallback className="rounded-lg text-xs md:text-sm">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-sm font-medium md:text-base">{profile?.user?.name}</span>
            <span className="text-muted-foreground truncate text-xs md:text-sm">
              {profile?.user?.email || profile?.anonymous_email || "-"}
            </span>
          </div>
        </span>
      </CardContent>
    </Card>
  );
};
