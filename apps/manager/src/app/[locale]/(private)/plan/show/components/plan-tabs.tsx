import { AppTabs } from "@/components/app-tabs";

import { PlanTabsProps } from "../types";

export function PlanTabs({ currentTab, onTabChange, tabs }: PlanTabsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <AppTabs
        headerClassName="px-2 sm:px-5 min-w-max"
        value={currentTab}
        onChange={(tab) => onTabChange(tab as any)}
        tabs={tabs}
        className="w-full"
      />
    </div>
  );
}
