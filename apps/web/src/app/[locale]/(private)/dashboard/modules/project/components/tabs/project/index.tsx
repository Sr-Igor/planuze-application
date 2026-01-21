"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";
import { Badge, cn, MainCard } from "@repo/ui";
import { formatCurrencySimple } from "@repo/utils/currency";

import { IProjectFinancial } from "../../../types";
import { formatPercentage } from "../../../utils";
import { Info } from "../../info";
import { colors, variants } from "./constants";

export interface IProjectsProps {
  projects: IProjectFinancial[];
  isLoading: boolean;
  currencyCode: string;
}

export const Projects = ({ projects, isLoading, currencyCode }: IProjectsProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const getProjectValue = (
    project: IProjectFinancial,
    key: "budget" | "actualCost" | "revenue" | "profit"
  ) => {
    if (project.valuesByCurrency?.[currencyCode]) {
      return project.valuesByCurrency[currencyCode][key];
    }
    switch (key) {
      case "budget":
        return project.budget;
      case "actualCost":
        return project.actualCost;
      case "revenue":
        return project.revenue;
      case "profit":
        return project.profit;
      default:
        return 0;
    }
  };

  const getStatusBadge = (status: IProjectFinancial["status"]) => {
    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {page(`project.projects.status.${status}`)}
      </Badge>
    );
  };

  return (
    <MainCard
      title={page("project.projects.title")}
      description={page("project.projects.description")}
      isLoading={isLoading}
      isEmpty={!projects?.length}
    >
      <div className={cn("space-y-4", isLoading && "opacity-0")}>
        {projects.map((project) => (
          <div key={project.projectId} className="rounded-lg border p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="font-semibold">{project.projectName}</h4>
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-muted-foreground text-sm">{project.versionName}</p>
              </div>

              <Info
                title={page("project.projects.progress")}
                value={`${project.progress.toFixed(1)}%`}
                valueClassName="text-right"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-3 md:grid-cols-4 lg:grid-cols-6">
              <Info
                title={page("project.projects.budget")}
                value={formatCurrencySimple(getProjectValue(project, "budget"), currencyCode)}
              />

              <Info
                title={page("project.projects.actual_cost")}
                value={formatCurrencySimple(getProjectValue(project, "actualCost"), currencyCode)}
              />

              <Info
                title={page("project.projects.revenue")}
                value={formatCurrencySimple(getProjectValue(project, "revenue"), currencyCode)}
              />

              <Info
                title={page("project.projects.profit")}
                value={formatCurrencySimple(getProjectValue(project, "profit"), currencyCode)}
              />

              <Info
                title={page("project.projects.profit_margin")}
                value={formatPercentage(project.profitMargin)}
              />

              <Info
                title={page("project.projects.budget_variance")}
                value={formatPercentage(project.budgetVariance)}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 border-t pt-3 md:grid-cols-3">
              <Info
                title={page("project.projects.estimated_duration")}
                value={`${project.estimatedDuration} ${page("project.projects.days")}`}
              />

              <Info
                title={page("project.projects.actual_duration")}
                value={`${project.actualDuration} ${page("project.projects.days")}`}
              />

              <Info
                title={page("project.projects.duration_variance")}
                value={formatPercentage(project.durationVariance)}
              />
            </div>
          </div>
        ))}
      </div>
    </MainCard>
  );
};
