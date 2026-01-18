"use client";

import * as React from "react";

import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@repo/ui-new";

import { ICycleHoursAnalysis } from "@repo/api/web/callers/project_kanban_report/types";
import { cn } from "@repo/ui-new";

export interface iCyclesAnalysisProps {
  data: ICycleHoursAnalysis[];
  isLoading: boolean;
}

export const CyclesAnalysis = ({ data, isLoading }: iCyclesAnalysisProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("report.hours.cycles_analysis.title")}</CardTitle>
        <CardDescription>{t("report.hours.cycles_analysis.description")}</CardDescription>
      </CardHeader>
      <CardContent className="relative min-h-[300px]">
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}

        {!isLoading && data.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <PackageOpen className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground text-md font-semibold">{t("report.empty")}</p>
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
            isLoading && "opacity-0"
          )}
        >
          {data.map((cycle, index) => (
            <div key={cycle.cycleId} className="rounded-lg border p-4">
              <div className="mb-3">
                <h4 className="font-semibold">{cycle.cycleTitle}</h4>
                {cycle.startDate && cycle.endDate && (
                  <p className="text-muted-foreground text-xs">
                    {new Date(cycle.startDate).toLocaleDateString("pt-BR")} -{" "}
                    {new Date(cycle.endDate).toLocaleDateString("pt-BR")}
                  </p>
                )}
                {cycle.utilDays !== null && (
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.cycles_analysis.util_days")}: {cycle.utilDays}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.allocated_members")}:
                  </span>
                  <span className="font-medium">{cycle.allocatedMembers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.max_hours_total")}:
                  </span>
                  <span className="font-medium">{cycle.totalMaxHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.available_hours_total")}:
                  </span>
                  <span className="font-medium">{cycle.totalAvailableHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.max_hours")}:
                  </span>
                  <span className="font-medium">{cycle.maxHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.available_hours")}:
                  </span>
                  <span className="font-medium">{cycle.availableHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.allocated_hours")}:
                  </span>
                  <span className="font-medium">{cycle.allocatedHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.estimated_hours")}:
                  </span>
                  <span className="font-medium">{cycle.estimatedHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.executed_hours")}:
                  </span>
                  <span className="font-medium">{cycle.executedHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.wip_hours")}:
                  </span>
                  <span className="font-medium">{cycle.wipHours}h</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.remaining_capacity")}:
                  </span>
                  <span className="font-medium">{cycle.remainingCapacity}h</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.remaining_hours")}:
                  </span>
                  <span className="font-medium">{cycle.remainingHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.utilization_rate")}:
                  </span>
                  <span className="font-medium">{cycle.utilizationRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.occupancy_rate")}:
                  </span>
                  <span className="font-medium">{cycle.occupancyRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("report.hours.cycles_analysis.capacity_usage")}:
                  </span>
                  <span className="font-medium">{cycle.capacityUsage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
