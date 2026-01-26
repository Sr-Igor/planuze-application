import { memo } from "react";

import { AppTabs, ScrollArea } from "@repo/ui";

import { TabsProps } from "../types";

export const Tabs = memo(function Tabs({
  currentTab,
  onTabChange,
  tabs,
  loading,
  hideTabs,
}: TabsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <AppTabs
        headerClassName="px-2 sm:px-5"
        value={currentTab}
        onChange={(tab: string) => onTabChange(tab)}
        hideTabs={hideTabs}
        tabs={tabs.map((tab) => ({
          ...tab,
          loading,
          children: <Scrollable>{tab.children}</Scrollable>,
        }))}
        className="w-full"
      />
    </div>
  );
});

export const Scrollable = memo(function Scrollable({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea
      style={{
        height: "calc(100vh - 350px)",
      }}
    >
      <div style={{ height: "calc(100vh - 350px)", maxHeight: "100%" }}>{children}</div>
    </ScrollArea>
  );
});
