"use client";

import * as React from "react";

import { Globe } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { AppTooltip, MainCard } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";
import { cn } from "@/lib/utils";
import { formatCurrencySimple } from "@/utils/currency";

import {
  ICostCenterAnalysis,
  IEmployeeCost,
  IProfitabilityMetrics,
  ITimelineAnalysis,
  IWorkTypeAnalysis,
} from "../../../types";
import { CardItem } from "../../card";
import { Info } from "../../info";

export interface IAnalysesProps {
  employeeCosts: IEmployeeCost[];
  costCenters: ICostCenterAnalysis[];
  workTypes: IWorkTypeAnalysis[];
  timeline: ITimelineAnalysis[];
  profitability?: IProfitabilityMetrics;
  isLoading: boolean;
  currencyCode: string;
}

export const Analyses = ({
  employeeCosts,
  costCenters,
  workTypes,
  timeline,
  profitability,
  isLoading,
  currencyCode,
}: IAnalysesProps) => {
  const t = useLang();
  const page = t.page.dashboard;
  const { dates } = useIntlFormat();
  const cardClass = "col-span-12 lg:col-span-6 xl:col-span-4";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <MainCard
        title={page("project.analyses.profitability.title")}
        description={page("project.analyses.profitability.description")}
        className="lg:col-span-2"
      >
        <div className={cn("grid grid-cols-12 gap-4")}>
          <CardItem
            className={cardClass}
            icon="TrendingUp"
            title={page("project.analyses.profitability.roi_amount", { currencyCode })}
            value={formatCurrencySimple(profitability?.roiAmount || 0, currencyCode)}
            isLoading={isLoading}
          />
          <CardItem
            className={cardClass}
            icon="TrendingUp"
            title={page("project.analyses.profitability.roi_percentage")}
            value={`${(profitability?.roiPercentage || 0).toFixed(2)}%`}
            isLoading={isLoading}
          />

          <CardItem
            className={cardClass}
            icon="TrendingUp"
            title={page("project.analyses.profitability.cost_efficiency_rate")}
            value={`${(profitability?.costEfficiencyRate || 0).toFixed(2)}%`}
            isLoading={isLoading}
          />

          <CardItem
            className={cardClass}
            icon="TrendingUp"
            title={page("project.analyses.profitability.revenue_per_hour")}
            value={formatCurrencySimple(profitability?.revenuePerHour || 0, currencyCode)}
            isLoading={isLoading}
          />

          <CardItem
            icon="TrendingUp"
            title={page("project.analyses.profitability.cost_per_hour")}
            value={formatCurrencySimple(profitability?.costPerHour || 0, currencyCode)}
            isLoading={isLoading}
            className={cardClass}
          />

          <CardItem
            icon="TrendingUp"
            title={page("project.analyses.profitability.break_even_point")}
            value={formatCurrencySimple(profitability?.breakEvenPoint || 0, currencyCode)}
            isLoading={isLoading}
            className={cardClass}
          />
        </div>
      </MainCard>

      <MainCard
        title={page("project.analyses.cost_centers.title")}
        description={page("project.analyses.cost_centers.description")}
        isLoading={isLoading}
        isEmpty={!costCenters?.length}
      >
        <div className={cn("space-y-3", isLoading && "opacity-0")}>
          {costCenters?.map((center) => (
            <div key={center.costCenterId} className="rounded-lg border p-3">
              <p className="mb-2 font-medium">{center.costCenterName}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Info
                  title={page("project.analyses.cost_centers.allocated")}
                  value={center.totalAllocated + t.helper("timer.h")}
                />

                <Info
                  title={page("project.analyses.cost_centers.spent")}
                  value={formatCurrencySimple(center.totalSpent, currencyCode)}
                />

                <Info
                  title={page("project.analyses.cost_centers.projects")}
                  value={center.projectsCount}
                />

                <Info
                  title={page("project.analyses.cost_centers.employees")}
                  value={center.employeesCount}
                />
              </div>
            </div>
          ))}
        </div>
      </MainCard>

      <MainCard
        title={page("project.analyses.work_types.title")}
        description={page("project.analyses.work_types.description")}
        isLoading={isLoading}
        isEmpty={!workTypes?.length}
      >
        <div className={cn("space-y-3", isLoading && "opacity-0")}>
          {workTypes?.map((workType) => (
            <div key={workType.workTypeId} className="rounded-lg border p-3">
              <p className="mb-2 font-medium">{workType.workTypeName}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Info
                  title={page("project.analyses.work_types.budget")}
                  value={formatCurrencySimple(workType.totalBudget, currencyCode)}
                />

                <Info
                  title={page("project.analyses.work_types.cost")}
                  value={formatCurrencySimple(workType.totalCost, currencyCode)}
                />

                <Info
                  title={page("project.analyses.work_types.steps")}
                  value={workType.projectsCount}
                />

                <Info
                  title={page("project.analyses.work_types.average_cost_per_project")}
                  value={formatCurrencySimple(workType.averageCostPerProject, currencyCode)}
                />
              </div>
            </div>
          ))}
        </div>
      </MainCard>

      <MainCard
        title={page("project.analyses.timeline.title")}
        description={page("project.analyses.timeline.description")}
        isLoading={isLoading}
        isEmpty={!timeline?.length}
      >
        <div className={cn("space-y-3", isLoading && "opacity-0")}>
          {timeline?.map((item) => (
            <div key={item.projectId} className="rounded-lg border p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">{item.projectName}</p>
                  {item.versionName && (
                    <p className="text-muted-foreground text-sm">{item.versionName}</p>
                  )}
                  {item.isLate && (
                    <span className="mt-1 inline-block rounded bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-500">
                      {page("project.analyses.timeline.late")}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Info
                  title={page("project.analyses.timeline.days_planned")}
                  value={item.daysPlanned}
                />

                <Info
                  title={page("project.analyses.timeline.days_actual")}
                  value={item.daysActual}
                />

                <Info
                  title={page("project.analyses.timeline.deviation")}
                  value={`${item.daysDeviation >= 0 ? "+" : ""} ${item.daysDeviation} ${page("project.analyses.timeline.days")}`}
                  valueClassName={cn(item.daysDeviation >= 0 ? "text-red-500" : "text-green-500")}
                />

                <Info
                  title={page("project.analyses.timeline.status")}
                  value={
                    item.isLate
                      ? page("project.analyses.timeline.late")
                      : page("project.analyses.timeline.on_schedule")
                  }
                  valueClassName={cn(item.isLate ? "text-red-500" : "text-green-500")}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4 border-t pt-3 text-xs">
                <Info
                  title={page("project.analyses.timeline.planned_start")}
                  value={
                    item.plannedStartDate
                      ? dates.formatDate(item.plannedStartDate)
                      : t.helper("none")
                  }
                />

                <Info
                  title={page("project.analyses.timeline.planned_end")}
                  value={
                    item.plannedEndDate ? dates.formatDate(item.plannedEndDate) : t.helper("none")
                  }
                />

                <Info
                  title={page("project.analyses.timeline.actual_start")}
                  value={
                    item.actualStartDate ? dates.formatDate(item.actualStartDate) : t.helper("none")
                  }
                />

                <Info
                  title={page("project.analyses.timeline.actual_end")}
                  value={
                    item.actualEndDate ? dates.formatDate(item.actualEndDate) : t.helper("none")
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </MainCard>

      <MainCard
        title={page("project.analyses.employee_costs.title")}
        description={page("project.analyses.employee_costs.description")}
        isLoading={isLoading}
        isEmpty={!employeeCosts?.length}
      >
        <div className={cn("space-y-3", isLoading && "opacity-0")}>
          {employeeCosts?.map((employee) => (
            <div key={employee.profileId} className="rounded-lg border p-3">
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{employee.profileName}</p>

                  {employee.isGlobal && (
                    <AppTooltip text={page("project.analyses.employee_costs.global")}>
                      <Globe className="size-4" />
                    </AppTooltip>
                  )}
                </div>

                <p className="text-muted-foreground text-xs">{employee.roleName}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {!!employee.simultaneousProjects && (
                  <Info
                    className="col-span-2"
                    title={page("project.analyses.employee_costs.simultaneous_projects")}
                    value={employee.simultaneousProjects}
                  />
                )}

                {!!employee.allocatedHours && (
                  <Info
                    className="col-span-2"
                    title={page("project.analyses.employee_costs.allocated_hours")}
                    value={`${employee.allocatedHours}${t.helper("timer.h")}`}
                  />
                )}
                <Info
                  title={page("project.analyses.employee_costs.hourly_rate")}
                  value={formatCurrencySimple(employee.hourlyRateUtil || 0, currencyCode)}
                />
                <Info
                  title={page("project.analyses.employee_costs.hourly_rate_total")}
                  value={formatCurrencySimple(employee.hourlyRateTotal || 0, currencyCode)}
                />
                <Info
                  title={page("project.analyses.employee_costs.total_cost")}
                  value={formatCurrencySimple(employee.totalCost, currencyCode)}
                />
                <Info
                  title={page("project.analyses.employee_costs.total_compensation")}
                  value={formatCurrencySimple(employee.totalCompensation, currencyCode)}
                />
              </div>
            </div>
          ))}
        </div>
      </MainCard>
    </div>
  );
};
