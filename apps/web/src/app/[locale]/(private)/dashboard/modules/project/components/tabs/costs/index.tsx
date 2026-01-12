"use client";

import * as React from "react";

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import { useLang } from "@repo/language/hook";
import { ChartContainer } from "@repo/ui";
import { MainCard } from "@repo/ui/app";

import { cn } from "@/lib/utils";
import { formatCurrencySimple } from "@repo/utils/currency";

import { ICostBreakdown } from "../../../types";
import { Info } from "../../info";
import { COLORS } from "./constants";

export interface ICostsProps {
  data?: ICostBreakdown[];
  isLoading: boolean;
  currencyCode: string;
}

export const Cost = ({ data = [], isLoading, currencyCode }: ICostsProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const totalPlanned = data.reduce((sum, item) => sum + item.planned, 0);

  const chartData = data.map((item) => {
    const executed = item.executed || 0;
    const variance = item.planned - executed;
    const percentageOfTotal = totalPlanned > 0 ? (item.planned / totalPlanned) * 100 : 0;

    return {
      name: page("project.costs.category." + item.category),
      value: item.planned,
      executed,
      variance,
      percentage: percentageOfTotal,
    };
  });

  return (
    <MainCard
      title={page("project.costs.title")}
      description={page("project.costs.description")}
      isLoading={isLoading}
      isEmpty={!data?.length}
    >
      <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-2", isLoading && "opacity-0")}>
        <div>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background rounded-lg border p-3 shadow-lg">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm">
                          {page("project.costs.planned")}:{" "}
                          {formatCurrencySimple(data?.value as number, currencyCode)}
                        </p>
                        {!!data?.executed && (
                          <p className="text-sm">
                            {page("project.costs.executed")}:{" "}
                            {formatCurrencySimple(data?.executed as number, currencyCode)}
                          </p>
                        )}
                        <p className="text-sm">
                          {data?.percentage?.toFixed(1)}% {page("project.costs.of_total")}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </div>

        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div key={item.name} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-muted-foreground text-xs">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Info
                  title={page("project.costs.planned")}
                  value={formatCurrencySimple(item.value, currencyCode)}
                />

                {!!item.executed && (
                  <>
                    <Info
                      title={page("project.costs.executed")}
                      value={formatCurrencySimple(item.executed, currencyCode)}
                    />

                    <Info
                      title={page("project.costs.variance")}
                      value={`${item.variance >= 0 ? "+" : ""} ${formatCurrencySimple(item.variance, currencyCode)}`}
                      valueClassName={cn(item.variance >= 0 ? "text-green-500" : "text-red-500")}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainCard>
  );
};
