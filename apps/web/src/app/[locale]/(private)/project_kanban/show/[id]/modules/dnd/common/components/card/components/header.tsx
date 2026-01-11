"use client";

import { Plus } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button, CardHeader, CardTitle } from "@repo/ui";
import { AppTooltip, Icon } from "@repo/ui/app";

import {
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
} from "@/api/generator/types";
import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { Permission } from "@/components/ui/permission";
import { useAccess } from "@/hooks/access";
import { cn } from "@/lib/utils";

import { Actions } from "./actions";

export interface IHeaderProps {
  cardType?: project_kanban_cycle_card_type;
  card: project_kanban_cycle_card;
  column: project_kanban_cycle_column;
  isUnlinked: boolean;
  cardId: string;
}

export const Header = ({ cardType, card, column, isUnlinked, cardId }: IHeaderProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const lang = useLang();
  const t = lang.page.kanban;

  const { state } = useKanbanShow();
  return (
    <CardHeader className="p-0">
      <div className="flex items-center justify-between gap-2">
        <CardTitle
          className={cn(
            "flex items-start gap-1",
            !perm.show || isUnlinked ? "cursor-default" : "hover:cursor-pointer hover:underline"
          )}
          onClick={(e) => {
            if (!perm.show || isUnlinked) return;
            e.stopPropagation();
            state.card.update({ columnId: column.id, card });
          }}
        >
          <Icon
            name={cardType?.icon}
            className="h-4 w-4"
            style={{
              color: cardType?.color || "transparent",
            }}
          />
          <AppTooltip text={!isUnlinked ? card.title : ""}>
            <p className="line-clamp-2 flex-1 text-[12px] leading-tight font-medium">
              {card.public_id ? `[${card.public_id}] ` : ""} {card.title}
            </p>
          </AppTooltip>
        </CardTitle>

        <div className="flex items-center gap-1">
          <Permission permission={["store"]} feature="project_kanban_cycle_card">
            {cardType?.principal && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                data-card-id={cardId}
                onClick={(e) => {
                  e.stopPropagation();
                  state.card.store({
                    columnId: card.project_kanban_cycle_column_id,
                    anchor: card,
                  });
                }}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">{t("component.card.add_subtask")}</span>
              </Button>
            )}
          </Permission>

          {!isUnlinked && <Actions card={card} column={column} cardId={cardId} />}
        </div>
      </div>
    </CardHeader>
  );
};
