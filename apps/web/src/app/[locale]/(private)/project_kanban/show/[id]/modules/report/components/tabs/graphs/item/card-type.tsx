"use client";

import * as React from "react";

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import { useLang } from "@repo/language/hook";
import { ChartConfig, ChartContainer } from "@repo/ui";

import { ICardsByType } from "@/api/callers/project_kanban_report/types";

import { Container } from "../container";

export interface iCardTypeProps {
  data: ICardsByType[];
  config: ChartConfig;
  isLoading: boolean;
}

export const CardType = ({ data, config, isLoading }: iCardTypeProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Container
      title={t("report.graphs.card_type.title")}
      description={t("report.graphs.card_type.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config}>
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-3 shadow-lg">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-sm">
                      {config.count.label}: {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie data={data} dataKey="count" nameKey="type" label cx="50%" cy="50%">
            {data.map((entry, index) => {
              return <Cell key={`cell-${index}`} fill={entry.color || "var(--foreground)"} />;
            })}
          </Pie>
          <Legend />
        </PieChart>
      </ChartContainer>
    </Container>
  );
};
