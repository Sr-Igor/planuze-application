"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";
import { Badge, cn, MainCard } from "@repo/ui";

import { IPersonalSummary, IProjectActivity } from "../../../types";
import { getStatusColor } from "../../../utils";
import { CardItem } from "../../card";
import { Info } from "../../info";

export interface IProjectsProps {
  summary?: IPersonalSummary;
  projects: IProjectActivity[];
  isLoading: boolean;
}

export const Projects = ({ summary, projects, isLoading }: IProjectsProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const getProjectStatusBadge = (status: IProjectActivity["status"]) => {
    const variants: Record<
      IProjectActivity["status"],
      "default" | "secondary" | "destructive" | "outline"
    > = {
      active: "default",
      completed: "secondary",
      pending: "outline",
    };

    return (
      <Badge variant={variants[status]} className={getStatusColor(status)}>
        {page(`personal.projects.status.${status}`)}
      </Badge>
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="space-y-6">
      {/* Seção de Resumo */}
      {summary && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">{page("personal.projects.summary.title")}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardItem
              className="col-span-1"
              icon="Briefcase"
              title={page("personal.projects.summary.total_projects")}
              value={summary.totalProjects || 0}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="PlayCircle"
              title={page("personal.projects.summary.active_projects")}
              value={summary.activeProjects || 0}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="CheckCircle"
              title={page("personal.projects.summary.completed_projects")}
              value={summary.completedProjects || 0}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Users"
              title={page("personal.projects.summary.total_allocations")}
              value={summary.totalAllocations || 0}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Clock"
              title={page("personal.projects.summary.total_hours_worked")}
              value={`${summary.totalHoursWorked || 0}h`}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Calendar"
              title={page("personal.projects.summary.total_hours_allocated")}
              value={`${summary.totalHoursAllocated || 0}h`}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Seção de Projetos */}
      <MainCard
        title={page("personal.projects.title")}
        description={page("personal.projects.description")}
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
                    {getProjectStatusBadge(project.status)}
                  </div>
                  {project.versionName && (
                    <p className="text-muted-foreground text-sm">{project.versionName}</p>
                  )}
                  <p className="text-muted-foreground mt-1 text-sm">{project.role}</p>
                </div>

                <Info
                  title={page("personal.projects.progress")}
                  value={`${project.progress.toFixed(1)}%`}
                  valueClassName="text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-3 md:grid-cols-4">
                <Info
                  title={page("personal.projects.start_date")}
                  value={formatDate(project.startDate)}
                />

                <Info
                  title={page("personal.projects.end_date")}
                  value={formatDate(project.endDate)}
                />

                <Info
                  title={page("personal.projects.allocated_hours")}
                  value={`${project.allocatedHours}h`}
                />

                <Info
                  title={page("personal.projects.worked_hours")}
                  value={`${project.workedHours}h`}
                />
              </div>
            </div>
          ))}
        </div>
      </MainCard>
    </div>
  );
};
