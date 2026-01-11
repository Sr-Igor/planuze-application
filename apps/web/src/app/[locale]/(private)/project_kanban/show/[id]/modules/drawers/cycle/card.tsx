import { FolderKanban, History, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hook";
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
import { StatusCircle } from "@repo/ui/app";

import { project_kanban_cycle } from "@/api/generator/types";
import { Permission } from "@/components/ui/permission";
import { useIntlFormat } from "@/hooks/intl-format";
import { cn } from "@/lib/utils";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_kanban_cycle;
  loading: boolean;
}
export const Card = ({ card, loading }: ICardProps) => {
  const lang = useLang();
  const t = lang.page.kanban;
  const { dates } = useIntlFormat();
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
            <FolderKanban className="size-4" />
            {card.title} {card.work_type?.title && `(${card.work_type?.title})`}
          </CardTitle>
        </CardHeader>
        <div className="flex justify-between gap-2">
          <div>
            <CardDescription className="text-xs">
              {t("drawer.cycle.init")}: {dates.formatDate(card.start_date)}
              <br />
              {t("drawer.cycle.end")}: {dates.formatDate(card.end_date)}
            </CardDescription>
            <CardDescription className="text-xs">
              {t("drawer.cycle.version")}: V{card.project_version?.version || "-"}
            </CardDescription>
            <CardDescription className="flex items-center gap-2 text-xs">
              {t("drawer.cycle.prepare")}:{" "}
              <StatusCircle status={card.prepare} className="h-4 w-4" />
            </CardDescription>
            <CardDescription className="text-xs">
              {t("drawer.cycle.base_template")}: {card.kanban_template?.title || "-"}
            </CardDescription>
          </div>
          <CardFooter className="flex gap-1 p-0">
            <Permission permission={["show"]} feature="project_kanban_cycle">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => state.logs.open({ item: card, type: "cycle" })}
              >
                <History />
              </Button>
            </Permission>
            <Permission permission={["update"]} feature="project_kanban_cycle">
              <Button variant="outline" size="icon" onClick={() => state.cycle.form(card)}>
                <Pen />
              </Button>
            </Permission>
            <Permission permission={["destroy"]} feature="project_kanban_cycle">
              <Button variant="destructive" size="icon" onClick={() => state.cycle.delete(card)}>
                <Trash />
              </Button>
            </Permission>
          </CardFooter>
        </div>
      </CardContent>
    </CardComponent>
  );
};
