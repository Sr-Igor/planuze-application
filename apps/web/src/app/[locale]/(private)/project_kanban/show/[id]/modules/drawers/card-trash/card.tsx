import { ClockArrowDown, History } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import {
  AppTooltip,
  Button,
  Card as CardComponent,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Icon,
  Skeleton,
} from "@repo/ui";

import { Permission } from "@/components/permission";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_kanban_cycle_card;
  loading: boolean;
}
export const Card = ({ card, loading = true }: ICardProps) => {
  const { state, data } = useKanbanShow();

  const cardType = data.cardsTypes?.find(
    (cardType) => cardType.id === card.project_kanban_cycle_card_type_id
  );

  return (
    <CardComponent className="hover:bg-sidebar-accent flex min-h-12 flex-row items-center justify-between overflow-hidden rounded-none border-none p-0">
      <span className="w-full" role="button" tabIndex={0}>
        <CardContent className="flex w-full flex-row justify-between border-b-1 p-4">
          <CardHeader className="relative w-full flex-1 p-0">
            {loading && <Skeleton className="absolute h-full w-full" />}

            <div
              className={cn(
                "flex items-center justify-start gap-2",
                "transition-all duration-300",
                loading && "opacity-0"
              )}
            >
              <AppTooltip
                text={`${card.title} / ${card.project_kanban_cycle?.title || "-"} / ${card.project_kanban_cycle_column?.title || "-"}`}
              >
                <Icon name={cardType?.icon} size={16} color={cardType?.color || "#94A3B8"} />
              </AppTooltip>
              <CardTitle className="line-clamp-1">{card.title}</CardTitle>
            </div>
            <span
              className={cn(
                "mr-2 flex flex-1 flex-col items-start gap-1",
                "transition-all duration-300",
                loading && "opacity-0"
              )}
            >
              <span className="text-muted-foreground line-clamp-1 text-[10px]">
                {card.project_kanban_cycle?.title} / {card.project_kanban_cycle_column?.title}
              </span>
            </span>
          </CardHeader>
          <CardFooter className="flex gap-1 p-0">
            <Permission permission={["show"]} feature="project_kanban_cycle_card">
              <Button
                variant="ghost"
                size="icon"
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  state.logs.open({ item: card, type: "card" });
                }}
              >
                <History />
              </Button>
            </Permission>
            <Permission permission={["restore"]} feature="project_kanban_cycle_card">
              <Button
                size="icon"
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  state.card.restore(card);
                }}
              >
                <ClockArrowDown />
              </Button>
            </Permission>
          </CardFooter>
        </CardContent>
      </span>
    </CardComponent>
  );
};
