import { History, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { project_kanban_cycle_card_type } from "@repo/types";
import {
  Button,
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Icon,
  Skeleton,
  StatusCircle,
} from "@repo/ui";

import { Permission } from "@/components/permission";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_kanban_cycle_card_type;
  loading: boolean;
}
export const Card = ({ card, loading }: ICardProps) => {
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
            <Icon name={card.icon} className="size-4" style={{ color: card.color! }} />
            {card.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            {t("drawer.cardType.isPrincipal")}:{" "}
            <StatusCircle status={card.principal} className="h-4 w-4" />
          </CardDescription>
          <CardDescription className="flex items-center gap-2">
            {t("drawer.cardType.isProblem")}:{" "}
            <StatusCircle status={card.problem} className="h-4 w-4" />
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-1 p-0">
          <Permission permission={["show"]} feature="project_kanban">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => state.logs.open({ item: card, type: "cardType" })}
            >
              <History />
            </Button>
          </Permission>
          <Permission permission={["update"]} feature="project_kanban">
            <Button variant="outline" size="icon" onClick={() => state.cardType.form(card)}>
              <Pen />
            </Button>
          </Permission>
          <Permission permission={["destroy"]} feature="project_kanban">
            <Button variant="destructive" size="icon" onClick={() => state.cardType.delete(card)}>
              <Trash />
            </Button>
          </Permission>
        </CardFooter>
      </CardContent>
    </CardComponent>
  );
};
