"use client";

import * as React from "react";

import { useLang } from "@repo/language/hook";

import { IHoursAnalysis } from "@/api/callers/project_kanban_report/types";

import { CardItem } from "../../card";
import { CyclesAnalysis } from "./cycles-analysis";
import { ProfilesAnalysis } from "./profiles-analysis";

export interface iHoursProps {
  hours: IHoursAnalysis;
  isLoading: boolean;
}

export const Hours = ({ hours, isLoading }: iHoursProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardItem
          icon="Clock"
          title={t("report.hours.total_available_hours")}
          value={hours.totalAvailableHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.hours.total_estimated_hours")}
          value={hours.totalEstimatedHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.hours.total_executed_hours")}
          value={hours.totalExecutedHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.hours.total_wip_hours")}
          value={hours.totalWIPHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.hours.total_allocated_hours")}
          value={hours.totalAllocatedHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="TrendingUp"
          title={t("report.hours.overall_utilization_rate")}
          value={`${hours.overallUtilizationRate.toFixed(1)}%`}
          isLoading={isLoading}
        />
        <CardItem
          icon="TrendingUp"
          title={t("report.hours.overall_occupancy_rate")}
          value={`${hours.overallOccupancyRate.toFixed(1)}%`}
          isLoading={isLoading}
        />
        <CardItem
          icon="TrendingUp"
          title={t("report.hours.overall_capacity_usage")}
          value={`${hours.overallCapacityUsage.toFixed(1)}%`}
          isLoading={isLoading}
        />
      </div>

      {/* Análise por Ciclos */}
      <CyclesAnalysis data={hours.cyclesAnalysis} isLoading={isLoading} />

      {/* Análise por Perfis */}
      <ProfilesAnalysis data={hours.profilesAnalysis} isLoading={isLoading} />
    </div>
  );
};
