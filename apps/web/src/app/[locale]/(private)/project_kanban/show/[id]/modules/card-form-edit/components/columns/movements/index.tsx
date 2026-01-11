import { useLang } from "@repo/language/hook";

import { project_kanban_cycle_card } from "@/api/generator/types";

import { CardMovements } from "../../card-movements";
import { Collapsible } from "../../collapsible";
import { ScrollColumn } from "../../scroll-column";

export interface IMovementsProps {
  item?: project_kanban_cycle_card;
}

export const Movements = ({ item }: IMovementsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <ScrollColumn>
      <Collapsible title={t("card-form-edit.collapsible.movements")}>
        <CardMovements item={item} />
      </Collapsible>
    </ScrollColumn>
  );
};
