import { ArrowRightLeft, MoreHorizontal, Pencil, Replace, Trash } from "lucide-react";

import { project_kanban_cycle_card, project_kanban_cycle_column } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import * as Cn from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { Permission } from "@/components/permission";

export interface IActionsProps {
  column: project_kanban_cycle_column;
  card: project_kanban_cycle_card;
  cardId: string;
}

export const Actions = ({ card, column, cardId }: IActionsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { state } = useKanbanShow();
  return (
    <Permission permission={["update", "destroy"]} method="any" feature="project_kanban_cycle_card">
      <Cn.DropdownMenu>
        <Cn.DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" data-card-id={cardId}>
            <MoreHorizontal className="text-muted-foreground h-3 w-3" />
            <span className="sr-only">{t("component.card.actions.open_menu")}</span>
          </Button>
        </Cn.DropdownMenuTrigger>
        <Cn.DropdownMenuContent
          align="end"
          data-card-id={cardId}
          className={`dropdown-menu-${cardId}`}
        >
          <Permission permission={["update"]} feature="project_kanban_cycle_card">
            <Cn.DropdownMenuItem
              onClick={() => state.card.update({ columnId: column.id, card })}
              data-card-id={cardId}
            >
              <Pencil />
              {t("component.card.actions.edit_card")}
            </Cn.DropdownMenuItem>

            <Cn.DropdownMenuItem onClick={() => state.card.move(card)} data-card-id={cardId}>
              <ArrowRightLeft />
              {t("component.card.actions.move_card")}
            </Cn.DropdownMenuItem>
            <Cn.DropdownMenuItem onClick={() => state.card.change(card)} data-card-id={cardId}>
              <Replace />
              {t("component.card.actions.change_card_type")}
            </Cn.DropdownMenuItem>
          </Permission>
          <Permission permission={["destroy"]} feature="project_kanban_cycle_card">
            <Cn.DropdownMenuItem
              onClick={() => state.card.delete(card)}
              className="text-red-600"
              data-card-id={cardId}
            >
              <Trash className="text-red-600" />
              {t("component.card.actions.delete_card")}
            </Cn.DropdownMenuItem>
          </Permission>
        </Cn.DropdownMenuContent>
      </Cn.DropdownMenu>
    </Permission>
  );
};
