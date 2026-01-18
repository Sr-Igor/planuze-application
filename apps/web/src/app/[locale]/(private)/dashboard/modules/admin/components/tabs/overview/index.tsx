"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";
import { Badge, Separator } from "@repo/ui";
import { MainCard } from "@repo/ui/app";

import { cn } from "@repo/ui";

import { IAdminSummary } from "../../../types";
import { CardItem } from "../../card";
import { Info } from "../../info";

export interface IOverviewProps {
  summary?: IAdminSummary;
  isLoading: boolean;
}

export const Overview = ({ summary, isLoading }: IOverviewProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const formatDate = (date: string | Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      canceled: "destructive",
      pending: "outline",
    };

    return (
      <Badge variant={variants[status.toLowerCase()] || "outline"} className="ml-2">
        {page(`admin.overview.status.${status.toLowerCase()}`)}
      </Badge>
    );
  };

  if (!summary) return null;

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <MainCard
        title={page("admin.overview.company.title")}
        description={page("admin.overview.company.description")}
        isLoading={isLoading}
      >
        <div className={cn("space-y-4", isLoading && "opacity-0")}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Info title={page("admin.overview.company.name")} value={summary.company.name} />
            <Info
              title={page("admin.overview.company.created_at")}
              value={formatDate(summary.company.createdAt)}
            />
            <Info
              title={page("admin.overview.company.updated_at")}
              value={formatDate(summary.company.updatedAt)}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Info
              title={page("admin.overview.company.has_address")}
              value={
                summary.company.hasAddress ? page("admin.overview.yes") : page("admin.overview.no")
              }
            />
            <Info
              title={page("admin.overview.company.has_documents")}
              value={
                summary.company.hasDocuments
                  ? page("admin.overview.yes")
                  : page("admin.overview.no")
              }
            />
            <Info
              title={page("admin.overview.company.has_contacts")}
              value={
                summary.company.hasContacts ? page("admin.overview.yes") : page("admin.overview.no")
              }
            />
            <Info
              title={page("admin.overview.company.has_files")}
              value={
                summary.company.hasFiles ? page("admin.overview.yes") : page("admin.overview.no")
              }
            />
            <Info
              title={page("admin.overview.company.has_config")}
              value={
                summary.company.hasConfig ? page("admin.overview.yes") : page("admin.overview.no")
              }
            />
          </div>
        </div>
      </MainCard>

      {/* Licenses Summary */}
      <MainCard
        title={page("admin.overview.licenses.title")}
        description={page("admin.overview.licenses.description")}
        isLoading={isLoading}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
            isLoading && "opacity-0"
          )}
        >
          <CardItem
            className="col-span-1"
            icon="Key"
            title={page("admin.overview.licenses.total_licenses")}
            value={summary.licenses.totalLicenses || t.helper("unlimited")}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="UserCheck"
            title={page("admin.overview.licenses.used_licenses")}
            value={summary.licenses.usedLicenses || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="KeyRound"
            title={page("admin.overview.licenses.available_licenses")}
            value={summary.licenses.availableLicenses || t.helper("unlimited")}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="Percent"
            title={page("admin.overview.licenses.usage_percentage")}
            value={
              summary.licenses.usagePercentage
                ? `${summary.licenses.usagePercentage}%`
                : t.helper("unlimited")
            }
            isLoading={isLoading}
          />
        </div>
      </MainCard>

      {/* Users Summary */}
      <MainCard
        title={page("admin.overview.users.title")}
        description={page("admin.overview.users.description")}
        isLoading={isLoading}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
            isLoading && "opacity-0"
          )}
        >
          <CardItem
            className="col-span-1"
            icon="Users"
            title={page("admin.overview.users.total_users")}
            value={summary.users.totalUsers || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="UserCheck"
            title={page("admin.overview.users.active_users")}
            value={summary.users.activeUsers || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="UserX"
            title={page("admin.overview.users.inactive_users")}
            value={summary.users.inactiveUsers || 0}
            isLoading={isLoading}
          />
        </div>
      </MainCard>

      {/* Invite Summary */}
      <MainCard
        title={page("admin.overview.invites.title")}
        description={page("admin.overview.invites.description")}
        isLoading={isLoading}
      >
        <div className={cn("mt-4 grid grid-cols-1 gap-4 md:grid-cols-5", isLoading && "opacity-0")}>
          <CardItem
            className="col-span-1"
            icon="Mail"
            title={page("admin.overview.invites.total_invites")}
            value={summary.users.totalInvites || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="Clock"
            title={page("admin.overview.invites.pending_invites")}
            value={summary.users.pendingInvites || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="CheckCircle"
            title={page("admin.overview.invites.accepted_invites")}
            value={summary.users.acceptedInvites || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="XCircle"
            title={page("admin.overview.invites.refused_invites")}
            value={summary.users.refusedInvites || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="Clock"
            title={page("admin.overview.invites.expired_invites")}
            value={summary.users.expiredInvites || 0}
            isLoading={isLoading}
          />
        </div>
      </MainCard>

      {/* Subscriptions */}
      {summary.subscriptions && summary.subscriptions.length > 0 && (
        <MainCard
          title={page("admin.overview.subscriptions.title")}
          description={page("admin.overview.subscriptions.description")}
          isLoading={isLoading}
          isEmpty={!summary.subscriptions.length}
        >
          <div className={cn("space-y-3", isLoading && "opacity-0")}>
            {summary.subscriptions.map((subscription) => (
              <div key={subscription.subscriptionId} className="rounded-lg border p-4">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="font-semibold">{subscription.planTitle}</h4>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <p className="text-muted-foreground text-sm">{t.helper(subscription.model)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t pt-3 md:grid-cols-4">
                  <Info
                    title={page("admin.overview.subscriptions.start_date")}
                    value={formatDate(subscription.startDate)}
                  />
                  <Info
                    title={page("admin.overview.subscriptions.end_date")}
                    value={formatDate(subscription.endDate)}
                  />
                  <Info
                    title={page("admin.overview.subscriptions.days_off")}
                    value={subscription.daysOff || 0}
                  />
                  <Info
                    title={page("admin.overview.subscriptions.is_test")}
                    value={
                      subscription.isTest ? page("admin.overview.yes") : page("admin.overview.no")
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </MainCard>
      )}

      {/* Integrations */}
      <MainCard
        title={page("admin.overview.integrations.title")}
        description={page("admin.overview.integrations.description")}
        isLoading={isLoading}
      >
        <div className={cn("space-y-4", isLoading && "opacity-0")}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardItem
              className="col-span-1"
              icon="Plug"
              title={page("admin.overview.integrations.total_integrations")}
              value={summary.integrations.totalIntegrations || 0}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="CheckCircle"
              title={page("admin.overview.integrations.active_integrations")}
              value={summary.integrations.activeIntegrations || 0}
              isLoading={isLoading}
            />
          </div>
        </div>
      </MainCard>

      {/* Additional Information */}
      <MainCard
        title={page("admin.overview.additional.title")}
        description={page("admin.overview.additional.description")}
        isLoading={isLoading}
      >
        <div
          className={cn(
            "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5",
            isLoading && "opacity-0"
          )}
        >
          <CardItem
            className="col-span-1"
            icon="Building"
            title={page("admin.overview.additional.cost_centers")}
            value={summary.costCenters || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="Layers"
            title={page("admin.overview.additional.levels")}
            value={summary.levels || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="Briefcase"
            title={page("admin.overview.additional.work_types")}
            value={summary.workTypes || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="UserCog"
            title={page("admin.overview.additional.roles")}
            value={summary.roles || 0}
            isLoading={isLoading}
          />
          <CardItem
            className="col-span-1"
            icon="FileText"
            title={page("admin.overview.additional.invoices")}
            value={summary.invoices || 0}
            isLoading={isLoading}
          />
        </div>
      </MainCard>
    </div>
  );
};
