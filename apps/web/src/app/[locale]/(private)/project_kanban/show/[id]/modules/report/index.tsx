"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";
import { ScrollArea } from "@repo/ui";

import { placeholder } from "@repo/api/web/callers/project_kanban_report/placeholder";

import { useKanbanShow } from "../../context";
import { Graphs } from "./components/tabs/graphs";
import { Hours } from "./components/tabs/hours";
import { Ranking } from "./components/tabs/ranking";
import { Summary } from "./components/tabs/summary";

export const Report = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { params, callers, loadings } = useKanbanShow();

  const isLoading = loadings.report.index;

  const report = callers.report.onIndex?.() || placeholder;

  return (
    <ScrollArea className="mt-4 h-full">
      <div className="px-6 py-2 pb-6">
        {/* TAB: Cards */}
        {params?.report_tab === "cards" && (
          <Summary summary={report.summary} isLoading={isLoading} />
        )}

        {/* TAB: Gráficos */}
        {params?.report_tab === "charts" && (
          <Graphs
            charts={report.charts}
            timeAnalysis={report.timeAnalysis}
            cycleStats={report.cycleStats}
            isLoading={isLoading}
          />
        )}

        {/* TAB: Rankings */}
        {params?.report_tab === "rankings" && (
          <Ranking rankings={report.rankings} isLoading={isLoading} />
        )}

        {/* TAB: Horas */}
        {params?.report_tab === "hours" && <Hours hours={report.hours} isLoading={isLoading} />}

        {/* Metadata */}
        <div className="text-muted-foreground mt-5 text-center text-sm">
          <p>
            {t("report.generated_in")}{" "}
            {new Date(report.metadata.generatedAt).toLocaleString("pt-BR")}
          </p>
          <p>
            {t("report.total_of")} {report.metadata.totalCycles} {t("report.total_cycles")}
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
