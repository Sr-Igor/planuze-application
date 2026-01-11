"use client";

import * as React from "react";

import { useLang } from "@repo/language/hook";

import { ICharts, ICycleStats, ITimeAnalysis } from "@/api/callers/project_kanban_report/types";

import { CardType } from "./item/card-type";
import { Column } from "./item/column";
import { Cycle } from "./item/cycle";
import { Priority } from "./item/priority";
import { Timeline } from "./item/timeline";
import { WorkType } from "./item/work-type";

export interface iGraphsProps {
  charts: ICharts;
  timeAnalysis: ITimeAnalysis;
  cycleStats: ICycleStats[];
  isLoading: boolean;
}

export const Graphs = ({ charts, timeAnalysis, cycleStats, isLoading }: iGraphsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const chartsConfig = {
    count: { label: t("report.graphs.quantity") },
  };

  return (
    <div className="space-y-6">
      {/* Gráficos de Distribuição */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Cards por Coluna */}
        <Column data={charts.cardsByColumn} config={chartsConfig} isLoading={isLoading} />

        {/* Cards por Tipo */}
        <CardType data={charts.cardsByType} config={chartsConfig} isLoading={isLoading} />

        {/* Cards por Prioridade */}
        <Priority data={charts.cardsByPriority} config={chartsConfig} isLoading={isLoading} />

        {/* Cards por Tipo de Trabalho */}
        <WorkType data={charts.cardsByWorkType} config={chartsConfig} isLoading={isLoading} />
      </div>

      {/* Timeline de Cards Concluídos */}
      <Timeline
        data={timeAnalysis.completedCardsTimeline}
        config={chartsConfig}
        isLoading={isLoading}
      />

      {/* Estatísticas por Cycle */}
      <Cycle data={cycleStats} config={chartsConfig} isLoading={isLoading} />
    </div>
  );
};
