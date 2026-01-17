import { useLang } from "@repo/language/hook";

import { ISummary } from "@repo/api/web/callers/project_kanban_report/types";

import { CardItem } from "../../card";
import { CardCategory } from "../../card-category";

export interface iSummaryProps {
  summary: ISummary;
  isLoading: boolean;
}

export const Summary = ({ summary, isLoading }: iSummaryProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="space-y-6">
      <CardCategory
        cardsTotalByType={summary.cardsTotalByType}
        totalCards={summary.totalCards}
        isLoading={isLoading}
        isEmpty={summary.cardsTotalByType.length === 0}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title={t("report.summary.total_cards")}
          value={summary.totalCards}
          isLoading={isLoading}
        />

        <CardItem
          icon="CheckCircle2"
          iconClassName="text-green-500"
          title={t("report.summary.completed_cards")}
          value={summary.cardsCompleted}
          percentage={summary.completionRate}
          isLoading={isLoading}
        />

        <CardItem
          icon="Clock"
          iconClassName="text-blue-500"
          title={t("report.summary.in_progress_cards")}
          value={summary.cardsInProgress}
          isLoading={isLoading}
        />

        <CardItem
          icon="AlertCircle"
          iconClassName="text-red-500"
          title={t("report.summary.late_cards")}
          value={summary.cardsLate}
          isLoading={isLoading}
        />
      </div>

      {/* Estatísticas de Horas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardItem
          icon="Clock"
          title={t("report.summary.estimated_hours")}
          value={summary.totalEstimatedHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.summary.executed_hours")}
          value={summary.totalExecutedHours}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.summary.estimated_vs_executed_percentage")}
          value={`${summary.estimatedVsExecutedPercentage.toFixed(1)}%`}
          isLoading={isLoading}
        />
        <CardItem
          icon="Clock"
          title={t("report.summary.lead_time")}
          value={summary.averageLeadTime.formatted}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
