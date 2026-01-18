"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";

import {
  ICriticalCard,
  IRankings,
  ITopEngagedCard,
} from "@repo/api/web/callers/project_kanban_report/types";

import { Rank } from "../../rank";
import { LineEngagement } from "./lines/engagement";
import { LineHoursAllocation } from "./lines/hours-allocation";
import { LineMember } from "./lines/member";
import { LineSeverity } from "./lines/severity";

export interface iRankingProps {
  rankings: IRankings;
  isLoading: boolean;
}

export const Ranking = ({ rankings, isLoading }: iRankingProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Top Membros */}
      <Rank
        title={t("report.rank.member.title")}
        description={t("report.rank.member.description")}
        data={rankings.topMembers}
        renderItem={(item, index) => <LineMember member={item} index={index} />}
        isLoading={isLoading}
        isEmpty={rankings.topMembers.length === 0}
      />

      {/* Cards Críticos */}
      <Rank<ICriticalCard>
        title={t("report.rank.critical.title")}
        description={t("report.rank.critical.description")}
        data={rankings.criticalCards}
        renderItem={(item) => <LineSeverity card={item} />}
        isLoading={isLoading}
        isEmpty={rankings.criticalCards.length === 0}
      />
      {/* Horas por Alocação */}
      <span className="col-span-2">
        <Rank
          title={t("report.rank.hours_allocation.title")}
          description={t("report.rank.hours_allocation.description")}
          data={rankings.hoursByAllocation}
          renderItem={(item, index) => <LineHoursAllocation allocation={item} index={index} />}
          isLoading={isLoading}
          isEmpty={rankings.hoursByAllocation.length === 0}
        />
      </span>

      {/* Cards Mais Engajados */}
      <span className="col-span-2">
        <Rank<ITopEngagedCard>
          title={t("report.rank.engagement.title")}
          description={t("report.rank.engagement.description")}
          data={rankings.topEngagedCards}
          renderItem={(item) => <LineEngagement card={item} />}
          isLoading={isLoading}
          isEmpty={rankings.topEngagedCards.length === 0}
        />
      </span>
    </div>
  );
};
