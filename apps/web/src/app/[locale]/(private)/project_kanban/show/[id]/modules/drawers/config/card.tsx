import { Cog, History, Pen, Trash } from "lucide-react";

import { project_config } from "@repo/types";
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

import { Permission } from "@/components/ui/permission";
import { cn } from "@repo/ui";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_config;
  loading: boolean;
}
export const Card = ({ card, loading }: ICardProps) => {
  const lang = useLang();

  const { state } = useKanbanShow();
  return (
    <CardComponent className="relative overflow-hidden border-2 p-0">
      {loading && <Skeleton className="absolute top-0 left-0 h-full w-full" />}
      <CardContent
        className={cn(
          "bg-sidebar-accent flex flex-col justify-between p-4",
          "transition-all duration-300 ease-in-out",
          loading && "opacity-0"
        )}
      >
        <CardHeader className="mb-2 p-0">
          <CardTitle className="flex items-center gap-2">
            <Cog className="size-4" />
            {lang.helper("config")}: V{card.project_version?.version}
          </CardTitle>
        </CardHeader>
        <div className="flex justify-between gap-2">
          <div>
            <CardDescription className="text-xs">
              {lang.property("total_hour_day")}: {card.total_hour_day}
              {lang.helper("timer.h")}
              <br />
              {lang.property("util_hour_day")}: {card.util_hour_day}
              {lang.helper("timer.h")}
            </CardDescription>
          </div>
          <CardFooter className="flex gap-1 p-0">
            <Permission permission={["show"]} feature="project_config">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => state.logs.open({ item: card, type: "config" })}
              >
                <History />
              </Button>
            </Permission>
            <Permission permission={["update"]} feature="project_config">
              <Button variant="outline" size="icon" onClick={() => state.config.form(card)}>
                <Pen />
              </Button>
            </Permission>
            <Permission permission={["destroy"]} feature="project_config">
              <Button variant="destructive" size="icon" onClick={() => state.config.delete(card)}>
                <Trash />
              </Button>
            </Permission>
          </CardFooter>
        </div>
      </CardContent>
    </CardComponent>
  );
};
