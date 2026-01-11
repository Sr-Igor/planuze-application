import { Trash } from "lucide-react";

import { Button , Card as CardComponent, CardContent, CardFooter, CardHeader, CardTitle , Skeleton } from "@repo/ui";

import { profile, project_member } from "@/api/generator/types";
import { AppAvatar } from "@/components/ui/app-avatar";
import { Permission } from "@/components/ui/permission";
import { cn } from "@/lib/utils";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_member;
  loading: boolean;
  profile?: profile;
}
export const Card = ({ card, loading, profile }: ICardProps) => {
  const { state } = useKanbanShow();
  return (
    <CardComponent className="relative overflow-hidden border-2 p-0">
      {loading && <Skeleton className="absolute top-0 left-0 h-full w-full" />}
      <CardContent
        className={cn(
          "bg-sidebar-accent flex justify-between p-4",
          "transition-all duration-300 ease-in-out",
          loading && "opacity-0"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between p-0">
          <CardTitle className="flex items-center gap-2">
            <AppAvatar
              src={card.profile?.user?.avatar || ""}
              path="user/avatar"
              publicFile
              name={card.profile?.user?.name || card.profile?.anonymous_name || "-"}
              className="h-8 w-8"
              fallbackClassName="text-sm"
            />

            {card.profile?.user?.name || card.profile?.anonymous_name || "-"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex gap-1 p-0">
          <Permission permission={["destroy"]} feature="project_member">
            {profile?.id !== card.profile?.id && (
              <Button variant="destructive" size="icon" onClick={() => state.member.delete(card)}>
                <Trash />
              </Button>
            )}
          </Permission>
        </CardFooter>
      </CardContent>
    </CardComponent>
  );
};
