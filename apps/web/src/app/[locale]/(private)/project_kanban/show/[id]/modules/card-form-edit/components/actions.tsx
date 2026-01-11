import { Ellipsis } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDropdownMenu } from "@repo/ui/app";

import { project_kanban_cycle_card } from "@/api/generator/types";
import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useAccess } from "@/hooks/access";

export interface IActionsProps {
  item?: project_kanban_cycle_card;
}

export const Actions = ({ item }: IActionsProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const t = useLang();
  const tKanban = t.page.kanban;

  const { loadings, state, data } = useKanbanShow();
  return (
    <AppDropdownMenu
      trigger={
        <Button disabled={loadings.cycle.show || !data.cycles.length} variant="default">
          <Ellipsis />
        </Button>
      }
      groups={[
        {
          title: tKanban("card-form-edit.actions.title"),
          items: [
            {
              label: tKanban("card-form-edit.actions.move_card"),
              icon: "ArrowRightLeft",
              onClick: () => {
                item && state.card.move(item, false);
              },
              isVisible: perm.update,
            },
            {
              label: tKanban("card-form-edit.actions.change_card_type"),
              icon: "Replace",
              onClick: () => {
                item && state.card.change(item, false);
              },
              isVisible: perm.update,
            },
            {
              label: tKanban("card-form-edit.actions.delete_card"),
              variant: "destructive",
              icon: "Trash",
              onClick: () => {
                item && state.card.delete(item);
              },
              isVisible: perm.destroy,
            },
          ],
        },
      ]}
    />
  );
};
