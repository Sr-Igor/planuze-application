import { History, Pen, Trash } from "lucide-react";

import { project_kanban_cycle_column } from "@repo/types";
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
import { StatusCircle } from "@repo/ui";

import { Permission } from "@/components/permission";
import { cn } from "@repo/ui";

import { useKanbanShow } from "../../../context";

export interface IColumnProps {
  card: project_kanban_cycle_column;
  loading: boolean;
}
export const Card = ({ card, loading }: IColumnProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

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
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <div
              className="size-3 rounded-full"
              style={{
                backgroundColor: card.color || "#E2E8F0",
              }}
            />
            {card.title}
          </CardTitle>
          {/* <CardDescription className='text-xs'>limit: {card.limit || 'unlimited'}</CardDescription> */}
          <CardDescription className="flex items-center gap-2 text-xs">
            {t("drawer.column.isFinished")}:{" "}
            <StatusCircle status={card.finished} className="h-4 w-4" />
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-1 p-0">
          <Permission permission={["show"]} feature="project_kanban_cycle">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => state.logs.open({ item: card, type: "column" })}
            >
              <History />
            </Button>
          </Permission>
          <Permission permission={["update"]} feature="project_kanban_cycle">
            <Button variant="outline" size="icon" onClick={() => state.column.form(card)}>
              <Pen />
            </Button>
          </Permission>
          <Permission permission={["destroy"]} feature="project_kanban_cycle">
            <Button variant="destructive" size="icon" onClick={() => state.column.delete(card)}>
              <Trash />
            </Button>
          </Permission>
        </CardFooter>
      </CardContent>
    </CardComponent>
  );
};
