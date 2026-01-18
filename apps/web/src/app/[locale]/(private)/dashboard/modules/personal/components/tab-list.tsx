"use client";

import * as React from "react";

import { Briefcase, Home } from "lucide-react";

import { useLang } from "@repo/language/hooks";

import { cn } from "@repo/ui-new";

export type TabValue = "general" | "projects";

export interface ITabListProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export const TabList = ({ activeTab, onTabChange }: ITabListProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const tabs = [
    {
      icon: <Home className="h-4 w-4" />,
      value: "general" as TabValue,
      label: page("personal.tabs.general"),
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      value: "projects" as TabValue,
      label: page("personal.tabs.projects"),
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
