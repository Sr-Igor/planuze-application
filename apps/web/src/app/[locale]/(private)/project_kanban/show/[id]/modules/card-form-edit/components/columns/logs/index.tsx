import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Logs as LogsComponent } from "@repo/ui/app";

import { useLogs } from "@/hooks/logs";

import { Collapsible } from "../../collapsible";
import { ScrollColumn } from "../../scroll-column";

export interface ILogsProps {
  item?: project_kanban_cycle_card;
}

export const Logs = ({ item }: ILogsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const logKeys = useLogs();

  return (
    <ScrollColumn>
      <Collapsible title={t("card-form-edit.collapsible.logs")}>
        <LogsComponent<project_kanban_cycle_card>
          logs={item?.logs}
          {...logKeys.project_kanban_cycle_card()}
        />
      </Collapsible>
    </ScrollColumn>
  );
};
