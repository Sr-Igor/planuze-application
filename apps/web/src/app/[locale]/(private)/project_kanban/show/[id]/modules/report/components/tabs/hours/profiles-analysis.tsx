"use client";

import * as React from "react";

import { PackageOpen } from "lucide-react";

import { IProfileHoursAnalysis } from "@repo/api/types";
import { useLang } from "@repo/language/hooks";
import {
  AppAvatar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Icon,
  Skeleton,
} from "@repo/ui";

export interface iProfilesAnalysisProps {
  data: IProfileHoursAnalysis[];
  isLoading: boolean;
}

export const ProfilesAnalysis = ({ data, isLoading }: iProfilesAnalysisProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("report.hours.profiles_analysis.title")}</CardTitle>
        <CardDescription>{t("report.hours.profiles_analysis.description")}</CardDescription>
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

        <div className={cn("space-y-4", isLoading && "opacity-0")}>
          {data.map((profile) => (
            <div key={profile.profileId} className="rounded-lg border p-4">
              <div className="mb-3 flex items-center gap-3">
                {profile.profileAvatar ? (
                  <AppAvatar
                    // src={profile.profileAvatar || ''}
                    src={""}
                    path="user/avatar"
                    publicFile
                    name={profile.profileName || ""}
                    className="h-6 w-6 md:h-10 md:w-10"
                    fallbackClassName="text-xs md:text-sm"
                  />
                ) : (
                  <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                    <Icon name="User" className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{profile.profileName}</h4>
                </div>
              </div>

              {/* Capacidade */}
              <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.max_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.maxHours}h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.available_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.availableHours}h</p>
                </div>

                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.allocated_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.allocatedHours}h</p>
                </div>
              </div>

              {/* Horas Trabalhadas */}
              <div className="mb-4 grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.worked_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.workedHours}h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.wip_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.wipHours}h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.estimated_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.estimatedHours}h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.idle_hours")}
                  </p>
                  <p className="text-lg font-semibold">{profile.idleHours}h</p>
                </div>
              </div>

              {/* Taxas de Utilização */}
              <div className="mb-4 grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.productivity_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.productivityRate.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.utilization_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.utilizationRate.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.max_utilization_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.maxUtilizationRate.toFixed(1)}%</p>
                </div>
              </div>

              {/* Taxas de Alocação */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.allocation_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.allocationRate.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.max_allocation_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.maxAllocationRate.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    {t("report.hours.profiles_analysis.estimated_rate")}
                  </p>
                  <p className="text-lg font-semibold">{profile.estimatedRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
