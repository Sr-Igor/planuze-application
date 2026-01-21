import { Cog, Plus } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { AppDropdownMenu, Button } from "@repo/ui";

import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

import { useKanbanShow } from "../../../context";

export const Actions = () => {
  const { permissions } = useAccess();

  const lang = useLang();
  const t = lang.page.kanban;

  const { state, loadings, data } = useKanbanShow();

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Permission permission={["store"]} feature="project_kanban_cycle_card">
        <Button
          size="sm"
          className="hidden xl:flex"
          onClick={() => state.card.store({})}
          disabled={loadings.cycle.show || !data.cycles.length}
        >
          <Plus className="mr-1 h-4 w-4" />
          {t("component.line.new_card")}
        </Button>
      </Permission>
      <Permission permission={["store"]} feature="project_kanban_cycle">
        <Button
          size="sm"
          variant="secondary"
          className="hidden xl:flex"
          onClick={() => state.column.form()}
          disabled={loadings.cycle.show || !data.cycles.length}
        >
          <Plus className="mr-1 h-4 w-4" />
          {t("component.line.new_column")}
        </Button>
      </Permission>
      <Permission permission={["index"]} feature="project_kanban_cycle">
        <AppDropdownMenu
          trigger={
            <Button size="sm" disabled={loadings.cycle.show || !data.cycles.length}>
              <Cog />
            </Button>
          }
          groups={[
            {
              title: t("component.line.cycle_config"),
              items: [
                {
                  label: t("component.line.column"),
                  icon: "Columns3",
                  onClick: state.column.open,
                  isVisible: permissions("project_kanban_cycle").index,
                },
                {
                  label: t("component.line.allocation"),
                  icon: "Rows3",
                  onClick: state.allocation.open,
                  isVisible: permissions("project_kanban_cycle").index,
                },
              ],
            },
          ]}
        />
      </Permission>
    </div>
  );
};
