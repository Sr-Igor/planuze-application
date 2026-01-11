"use client";

import * as React from "react";

import { BarChart3, DollarSign, FileText, PieChart } from "lucide-react";

import { useLang } from "@repo/language/hook";

import { cn } from "@/lib/utils";

export type TabValue = "summary" | "projects" | "costs" | "analyses";

export interface ITabListProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export const TabList = ({ activeTab, onTabChange }: ITabListProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const tabs = [
    {
      icon: <DollarSign className="h-4 w-4" />,
      value: "summary" as TabValue,
      label: page("project.tabs.summary"),
    },
    {
      icon: <FileText className="h-4 w-4" />,
      value: "projects" as TabValue,
      label: page("project.tabs.projects"),
    },
    {
      icon: <PieChart className="h-4 w-4" />,
      value: "costs" as TabValue,
      label: page("project.tabs.costs"),
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      value: "analyses" as TabValue,
      label: page("project.tabs.analyses"),
    },
  ];

  return (
    <div className="bg-muted flex items-center justify-between overflow-hidden rounded-sm">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-1 p-2 text-xs font-medium transition-colors",
            activeTab === tab.value && "bg-foreground text-background"
          )}
        >
          {tab.icon}
          <p className="hidden xl:block">{tab.label}</p>
        </button>
      ))}
    </div>
  );
};
