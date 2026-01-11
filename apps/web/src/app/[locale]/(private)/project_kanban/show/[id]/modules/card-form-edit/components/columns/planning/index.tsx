import { UseFormReturn } from "react-hook-form";

import { useLang } from "@repo/language/hook";
import { Separator } from "@repo/ui";

import { useAccess } from "@/hooks/access";

import { Collapsible } from "../../collapsible";
import {
  EndDateEstimate,
  EndDateExecute,
  Estimate,
  Execute,
  Priority,
  Severity,
  Unit,
  WorkInProgress,
} from "../../form/fields";
import { ScrollColumn } from "../../scroll-column";

export interface IPlanningAndEffortProps {
  hook: UseFormReturn<any>;
}

export const PlanningAndEffort = ({ hook }: IPlanningAndEffortProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <ScrollColumn>
      <Collapsible title={t("card-form-edit.collapsible.planning")}>
        <Priority hook={hook} label={"priority"} disabled={!perm.update} />
        <Severity hook={hook} label={"severity"} disabled={!perm.update} />
        <EndDateEstimate hook={hook} label={"end_date_estimate"} disabled={!perm.update} />
        <EndDateExecute hook={hook} label={"end_date_execute"} disabled={!perm.update} />
      </Collapsible>

      <Separator />

      <Collapsible title={t("card-form-edit.collapsible.effort")}>
        <span className="flex items-center gap-2">
          <Estimate hook={hook} label={"estimate"} disabled={!perm.update} />
          <Unit hook={hook} name="estimate_unit" label={"unit"} disabled={!perm.update} />
        </span>
        <span className="flex items-center gap-2">
          <WorkInProgress hook={hook} label={"work_in_progress"} disabled={!perm.update} />
          <Unit hook={hook} name="work_in_progress_unit" label={"unit"} disabled={!perm.update} />
        </span>
        <span className="flex items-center gap-2">
          <Execute hook={hook} label={"execute"} disabled={!perm.update} />
          <Unit hook={hook} name="execute_unit" label={"unit"} disabled={!perm.update} />
        </span>
      </Collapsible>
    </ScrollColumn>
  );
};
