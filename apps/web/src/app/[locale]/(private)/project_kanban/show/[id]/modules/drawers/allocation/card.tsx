import { History, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@repo/ui";

import { AppAvatar } from "@/components/ui/app-avatar";
import { Permission } from "@/components/ui/permission";
import { cn } from "@repo/ui";

import { useKanbanShow } from "../../../context";
import { IProfile } from "../../../types";

export interface ICardProps {
  item: IProfile;
  loading: boolean;
}

export const Card = ({ item, loading }: ICardProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { state } = useKanbanShow();

  return (
    <CardComponent className="relative overflow-hidden border-2 p-0">
      {loading && <Skeleton className="absolute top-0 left-0 h-full w-full" />}
      <CardContent
        className={cn(
          "flex justify-between p-4",
          "transition-all duration-300 ease-in-out",
          loading && "opacity-0"
        )}
      >
        <CardHeader className="flex flex-col items-start justify-between p-0">
          <CardTitle className="flex items-center gap-2">
            <AppAvatar
              src={item.avatar || ""}
              path="user/avatar"
              publicFile
              name={item.name || ""}
              className="h-8 w-8"
              fallbackClassName="text-sm"
            />
            <div className="flex flex-col gap-2">
              <span>{item.name}</span>
              {!item.profile_member_id && (
                <span className="bg-destructive rounded-full px-2 text-xs font-normal">
                  {t("drawer.allocation.not_a_member")}
                </span>
              )}
            </div>
          </CardTitle>
          <CardDescription className="m-0 p-0 text-sm">
            {t("drawer.allocation.allocation")}:{" "}
            {item.time && item.unit
              ? `${item.time} ${lang.helper(item.unit)}`
              : t("drawer.allocation.not_allocated")}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-1 p-0">
          <Permission permission={["show"]} feature="project_kanban_cycle">
            {item?.allocation && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => state.logs.open({ item: item.allocation!, type: "allocation" })}
              >
                <History />
              </Button>
            )}
          </Permission>
          <Permission permission={["update"]} feature="project_kanban_cycle">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                state.allocation.form({
                  ...item.allocation!,
                  project_member_id: item.profile_member_id || null,
                  profile_id: item.profile_id!,
                })
              }
            >
              <Pen />
            </Button>
          </Permission>
          <Permission permission={["destroy"]} feature="project_kanban_cycle">
            {!item.profile_member_id && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => state.allocation.delete(item.allocation!)}
              >
                <Trash />
              </Button>
            )}
          </Permission>
        </CardFooter>
      </CardContent>
    </CardComponent>
  );
};
