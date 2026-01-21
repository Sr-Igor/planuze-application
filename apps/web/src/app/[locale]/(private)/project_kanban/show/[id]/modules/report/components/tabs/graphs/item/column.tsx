"use client";

import * as React from "react";

import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis } from "recharts";

import { IColumnDistribution } from "@repo/api/types";
import { useLang } from "@repo/language/hooks";
import { AppTooltip, ChartConfig, ChartContainer } from "@repo/ui";

import { Container } from "../container";

export interface iColumnProps {
  data: IColumnDistribution[];
  config: ChartConfig;
  isLoading: boolean;
}

export const Column = ({ data, config, isLoading }: iColumnProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const CustomTick = ({ x, y, payload }: any) => {
    const text = payload?.value || "";
    const isLong = text.length > 15;
    const displayText = isLong ? `${text.substring(0, 12)}...` : text;

    return (
      <AppTooltip text={isLong ? text : ""}>
        <text x={x} y={y} dy={16} textAnchor="middle" fill="currentColor" className="text-sm">
          {displayText}
        </text>
      </AppTooltip>
    );
  };

  return (
    <Container
      title={t("report.graphs.column.title")}
      description={t("report.graphs.column.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="columnTitle"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={<CustomTick />}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-3 shadow-lg">
                    <p className="font-medium">{payload[0].payload.columnTitle}</p>
                    <p className="text-sm">
                      {config.count.label}: {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="var(--foreground)" radius={8}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "var(--foreground)"} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </Container>
  );
};
