import { IHoursByAllocation } from "@repo/api/types";
import { useLang } from "@repo/language/hooks";
import { Separator } from "@repo/ui";

export interface iLineHoursAllocationProps {
  allocation: IHoursByAllocation;
  index: number;
}

export const LineHoursAllocation = ({ allocation, index }: iLineHoursAllocationProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div key={allocation.allocationId} className="flex items-center gap-4 rounded-lg border p-3">
      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 font-medium">
          <p>
            {allocation.memberName === "no_allocated"
              ? t("report.rank.line.no_allocated")
              : allocation.memberName}
          </p>

          {allocation.noAllocated && (
            <span className="truncate rounded-md bg-red-600 px-2 py-0.5 text-xs text-white">
              {t("report.rank.line.no_allocated")}
            </span>
          )}
        </div>
        <div className="flex h-6 items-center gap-2 py-2">
          <p className="text-muted-foreground text-sm">
            {t("report.rank.line.efficiency", { rate: allocation.efficiencyRate.toFixed(1) })}
          </p>
          <Separator orientation="vertical" className="bg-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            {t("report.rank.line.allocated", { hour: allocation.totalAllocatedHours })}
          </p>
        </div>
        <div className="text-muted-foreground mt-1 flex gap-4 text-xs">
          <span>
            {t("report.rank.line.estimated")}: {allocation.totalEstimatedHours}h
          </span>
          <span>
            {t("report.rank.line.executed")}: {allocation.totalExecutedHours}h
          </span>
          <span>
            {t("report.rank.line.wip")}: {allocation.totalWIPHours}h
          </span>
        </div>
      </div>
    </div>
  );
};
