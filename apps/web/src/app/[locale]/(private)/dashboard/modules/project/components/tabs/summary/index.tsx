"use client";

import * as React from "react";

import { useLang } from "@repo/language/hooks";

import { formatCurrencySimple } from "@repo/utils/currency";

import { IFinancialSummary } from "../../../types";
import { formatPercentage, getStatusColor } from "../../../utils";
import { CardItem } from "../../card";

export interface ISummaryProps {
  summary?: IFinancialSummary;
  isLoading: boolean;
  currencyCode: string;
}

export const Summary = ({ summary, isLoading, currencyCode }: ISummaryProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  // Usar valores convertidos se disponível, senão usar valores por moeda
  const getValue = (baseValue: number, currencyKey?: string) => {
    if (summary?.valuesConverted) {
      // Se conversão foi aplicada, usar valores convertidos
      switch (currencyKey) {
        case "totalBudget":
          return summary.valuesConverted.totalBudget;
        case "totalCost":
          return summary.valuesConverted.totalCost;
        case "totalRevenue":
          return summary.valuesConverted.totalRevenue;
        default:
          return baseValue;
      }
    }
    // Caso contrário, usar valores por moeda se disponível
    if (summary?.valuesByCurrency?.[currencyCode]) {
      switch (currencyKey) {
        case "totalBudget":
          return summary.valuesByCurrency[currencyCode].totalBudget;
        case "totalCost":
          return summary.valuesByCurrency[currencyCode].totalCost;
        case "totalRevenue":
          return summary.valuesByCurrency[currencyCode].totalRevenue;
        default:
          return baseValue;
      }
    }
    return baseValue;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardItem
        className="col-span-4"
        icon="DollarSign"
        title={page("project.summary.total_budget")}
        value={formatCurrencySimple(
          getValue(summary?.totalBudget || 0, "totalBudget"),
          currencyCode
        )}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-2"
        icon="TrendingDown"
        title={page("project.summary.total_cost")}
        value={formatCurrencySimple(getValue(summary?.totalCost || 0, "totalCost"), currencyCode)}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-2"
        icon="TrendingUp"
        title={page("project.summary.total_revenue")}
        value={formatCurrencySimple(
          getValue(summary?.totalRevenue || 0, "totalRevenue"),
          currencyCode
        )}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-2"
        icon="Percent"
        title={page("project.summary.profit_margin")}
        value={formatPercentage(summary?.profitMargin || 0)}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-2"
        icon="AlertTriangle"
        title={page("project.summary.budget_variance")}
        value={formatPercentage(summary?.budgetVariance || 0)}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-1"
        icon="Folder"
        title={page("project.summary.total_projects")}
        value={summary?.totalProjects || 0}
        isLoading={isLoading}
      />

      <CardItem
        className="col-span-4 xl:col-span-1"
        icon="PlayCircle"
        title={page("project.summary.active_projects")}
        value={summary?.activeProjects || 0}
        isLoading={isLoading}
        iconClassName={getStatusColor("active")}
      />

      <CardItem
        className="col-span-4 xl:col-span-1"
        icon="CheckCircle"
        title={page("project.summary.completed_projects")}
        value={summary?.completedProjects || 0}
        isLoading={isLoading}
        iconClassName={getStatusColor("completed")}
      />

      <CardItem
        className="col-span-4 xl:col-span-1"
        icon="AlertCircle"
        title={page("project.summary.late_projects")}
        value={summary?.lateProjects || 0}
        isLoading={isLoading}
        iconClassName={getStatusColor("late")}
      />
    </div>
  );
};
