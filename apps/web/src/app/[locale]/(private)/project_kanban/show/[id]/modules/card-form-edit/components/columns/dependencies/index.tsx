import { PackageOpen, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { useLang } from "@repo/language/hooks";
import { project_kanban_cycle_card } from "@repo/types";
import { Button } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { AppCardSelector } from "@/components/app-cycle-card-selector";
import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

import { Collapsible } from "../../collapsible";
import { Objective, Target } from "../../form/fields";
import { ScrollColumn } from "../../scroll-column";

export interface IDependenciesAndObjectivesProps {
  hook: UseFormReturn<any>;
  objectiveId?: string | null;
  item?: project_kanban_cycle_card;
}

export const DependenciesAndObjectives = ({
  item,
  hook,
  objectiveId,
}: IDependenciesAndObjectivesProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const lang = useLang();
  const t = lang.page.kanban;

  const { data, state } = useKanbanShow();

  const cycle = data.cycles.find((cycle) => cycle.id === item?.project_kanban_cycle_id);
  const firstColumn = cycle?.project_kanban_cycle_columns?.sort((a, b) => a.order - b.order)[0];

  const cardType = item?.project_kanban_cycle_card_type;
  return (
    <ScrollColumn>
      <Collapsible title={t("card-form-edit.collapsible.objectives_and_targets")}>
        <div className="flex flex-col gap-2">
          <Objective
            hook={hook}
            item={item}
            label={t("card-form-edit.label.objective")}
            placeholder={t("card-form-edit.placeholder.objective")}
            disabled={!perm.update}
          />
          <Target
            hook={hook}
            item={item}
            objectiveId={objectiveId}
            label={t("card-form-edit.label.target")}
            placeholder={t("card-form-edit.placeholder.target")}
            disabled={!perm.update}
          />
        </div>
      </Collapsible>
      {cardType?.principal && (
        <Collapsible title={t("card-form-edit.collapsible.dependent_cards")}>
          {cardType?.principal && (
            <Permission permission={["store"]} feature="project_kanban_cycle_card">
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => {
                    state.card.store({
                      card: item,
                      anchor: item,
                      columnId: firstColumn?.id,
                      forcedMode: "store",
                      close: false,
                    });
                  }}
                >
                  <Plus />
                  {t("card-form-edit.add_children")}
                </Button>
              </div>
            </Permission>
          )}
          <div className="mt-4 flex flex-col gap-2">
            {item?.project_kanban_cycle_cards?.map((subCard) => (
              <Button
                key={subCard.id}
                variant="outline"
                className="w-full px-4 py-6"
                disabled={!perm.show}
                onClick={() => {
                  state.card.update({
                    card: subCard,
                    columnId: subCard.project_kanban_cycle_column_id,
                  });
                }}
              >
                <AppCardSelector item={subCard} className="justify-space-between w-ful" />
              </Button>
            ))}
          </div>
          {!item?.project_kanban_cycle_cards?.length && (
            <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-6">
              <PackageOpen size={40} />
              <p>{t("card-form-edit.no_dependent_cards")}</p>
            </div>
          )}
        </Collapsible>
      )}
      {!cardType?.principal && (
        <Collapsible title={t("card-form-edit.collapsible.parent")}>
          {item?.card && (
            <Button
              key={item!.card!.id}
              variant="outline"
              className="w-full px-4 py-6"
              disabled={!perm.show}
              onClick={() => {
                state.card.update({
                  card: item!.card!,
                  columnId: item!.card!.project_kanban_cycle_column_id!,
                });
              }}
            >
              <AppCardSelector item={item!.card!} />
            </Button>
          )}
          {!item?.card && (
            <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-6">
              <PackageOpen size={40} />
              <p>{t("card-form-edit.no_parent_card")}</p>
            </div>
          )}
        </Collapsible>
      )}
    </ScrollColumn>
  );
};
